# Why I Built esetres

**esetres** is a binary application used to setup and run file storage servers. It makes hosting your own file storage server trivial.

My development environment is unique to say the least and downright difficult to put it plainly. On our network there is no access to external apis meaning many of the services you quickly think of as established standards such as [S3](https://aws.amazon.com/s3/) simply aren't an option for our applications. As frustrating as this can sometimes be, it also opens the door for us to have some fun and build our own solutions where it otherwise wouldn't be advisable.

## My Requirements

-   Uses REST API
-   Has Access Control
-   Is standalone (No database or hosts its own database)
-   Has fast retrieval for even private files
-   Is dead simple setup and startup

## Choosing the tech

Recently I have really grown a love for [Rust](https://www.rust-lang.org/) and it seems like the most appropriate choice if I want to build something reliable quickly. I am most familiar with the [axum](https://github.com/tokio-rs/axum) web framework for building REST APIs in Rust so I will use that to build out the API.

My hosting environment is just a virtual machine hosted on a private network so for access control I will use json web tokens that are generated on the server through a CLI. Once generated these can be sent from the client in the request Authorization header and validated by the server.

## Building esetres

Building esetres was a great opportunity for me to learn quite a few things that no one wants to know about storing and serving files. One of those being [MIME types](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types).

MIME Types are what determines the content type of a http request or response. Most front end developers are familiar with these to the extent of setting the `Content-Type` header in their requests to `application/json`. However when you are trying to serve many different types of files it becomes unreasonable to manually create and maintain a list of all the types. Luckily for me I am not the first person to have ever dealt with this problem and therefore there are multiple maintained lists of MIME types already out there.

What I was looking for was a list of file extensions and their corresponding MIME types. I first came upon the list provided by [IANA](https://www.iana.org/assignments/media-types/media-types.xhtml). This list is good but as I found out it is actually incomplete. For instance if you wanted to get the MIME type for a common file type such as `.jpg` you would find that it isn't present on the list.

After this realization I searched GitHub and found [mime-db](https://github.com/jshttp/mime-db) a complete database of MIME types conveniently stored in everyone's favorite format, JSON! With this I wrote some code to fetch the file and parse the JSON into a hashmap of `[extension, MIME Type]`. Now when receiving a request I would extract the file extension and use that to determine the MIME type sent in the response.

With this I could easily read the files from the `buckets` and serve them to the user. So I moved on to the next step **Authorization**.

By now I am pretty confident implementing JWT having built and re-built authentication servers for applications at work a few times over. So the next part was fairly simple. I looked a bit for a library to handle the signing of the tokens and it seemed like [jsonwebtoken](https://github.com/Keats/jsonwebtoken) was by far the most popular so I chose to use that. I then implemented a few functions for signing and validating and that was that.

Next I would need to work on managing tokens so that they could be revoked and immediately return 401 codes to requests using that token. The easiest way to do that would be to create a cache containing the name of each token and its correct token hash. When a request is made I would extract the `name` of the token from the token claims and use that to retrieve the token from a hashmap. Once I found the token with the same name I would then verify the token against its hash using [bcrypt](https://github.com/Keats/rust-bcrypt) before using the `scope` claim to check its access to the requested bucket. This was slightly more complicated. First I would need a place to store the tokens.

For this I opted to use [SQLite](https://www.sqlite.org/index.html) I would just need a single table for the tokens that ends up looking like this:

```sql
CREATE TABLE tokens (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL UNIQUE,
    bucket_scope TEXT NOT NULL,
    access TEXT NOT NULL, -- read | write | full
    token TEXT NOT NULL
)
```

For accessing the database I decided to use [rusqlite](https://github.com/rusqlite/rusqlite) as it provides a simple api without the bloat you get by using an ORM (especially since I only have 1 table). With that I can implement the CLI commands to `mint`, `list`, and `revoke` tokens allowing anyone with access to the VM to manage the tokens.

My next problem was with the cache, tokens are created from the CLI but consumed by the API, since these both run separately the CLI needs a way to tell the API that the token cache needs to be refreshed. Luckily since we are using a REST API this is fairly simple. We just add a route `/cache/invalidate` which will invalidate the token cache and re-fetch the tokens from the database when called by the CLI, excellent! Only one problem, exposing this route could easily lead to an attack by spamming the route with requests and preventing the cache from ever having tokens causing all requests to return 401.

To prevent this from happening we need to prevent the API route from being called by anything other than the CLI. This is fairly simple, by adding an IP filter to the route we can restrict any IP that is not the host machine from accessing the route returning a 401. To do this I will add some middleware to **axum** to check the request IP against the current IP used to host the application.

```rs
pub async fn from_host(
    ConnectInfo(addr): ConnectInfo<SocketAddr>,
    request: Request,
    next: Next,
) -> Response {
    let config = config::get();

    let valid_ip = IpAddr::from_str(&config.ip).unwrap();

    if addr.ip() != valid_ip {
        return (StatusCode::UNAUTHORIZED).into_response();
    }

    next.run(request).await
}
```

I can then apply this middleware to just the `/cache/invalidate` route so that the rule doesn't apply to everything else.

Perfect now we can manage our access tokens. Finally to tackle one of the more important questions I have had throughout the entire project. How should I restrict `GET` access? With non-expiring tokens you can't have the token as a query parameter as you sometimes see as it would be pretty easily compromised.

Instead I decided to go with a different system. If you need to restrict the `GET` access to a file you can place it under the `private` scope of the bucket and all other files can go to the `public` scope. This way if you want to serve something like an image you can easily serve it without having to worry about tokens or anything in the URL but if you want to serve something like a tax document you can keep that behind a token that must be provided in an Authorization header.

Finally I implemented an `init` command to help setup all the environment variables and run database migrations to make it dead simple to setup and run.

## Why would I use this?

If you don't have the ability to use S3 but have easy access to a VM you control. **esetres** is insanely fast to setup and should easily scale for most of what you need to do on a private network. Since its open source its easy to [open an issue](https://github.com/ieedan/esetres/issues) or even just fork it and change it for your own liking.

Overall it was a really fun and interesting project that is working really well for my application. 

Thanks for reading and if esetres is the solution you are looking for then you can give it a try [here](https://github.com/ieedan/esetres).
