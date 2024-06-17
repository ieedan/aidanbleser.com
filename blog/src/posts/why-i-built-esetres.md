# Why I Built esetres

**esetres** is a binary used to initialize and run file storage servers. It makes it trivial to host your own file storage server.

My development environment is unique to say the least and downright difficult to put it plainly. On our work network there is no access to external apis meaning many of the services you quickly think of as established standards such as [S3](https://aws.amazon.com/s3/) simply aren't an option for our applications. As frustrating as this can sometimes be it also opens the door for us to have some fun and build our own solutions where it otherwise wouldn't be advisable.

## My Requirements

-   REST API
-   Access Control
-   Standalone (No database or hosts its own database)
-   Fast retrieval for even private files
-   Dead simple setup and startup

## Choosing the tech

Recently I have really grown a love for [Rust](https://www.rust-lang.org/) and it seems like the most appropriate choice if I want to build something reliable that can be easily refactored. I am most familiar with the [axum](https://github.com/tokio-rs/axum) web framework for building REST APIs in Rust so I will use that to build out the API.

My hosting environment is just a virtual machine hosted on a private network so for access control I will use json web tokens that are generated on the server through a CLI. These can then be kept as environment variables that the client will need to send with their request.

To store the tokens I will use [SQLite](https://www.sqlite.org/index.html) which should be the easiest solution considering I only need to create a single table. To keep the service fast I will implement a caching system to store all valid tokens to prevent unnecessary calls to the database.

Since this can be a pain to setup I will create an `init` command that will automatically create the database and setup the necessary environment variables.

## Building esetres

Building esetres was a great opportunity for me to learn quite a few things that no one wants to know about storing and serving files. First of which being [MIME types](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types). 

MIME Types are what determines the content type of a http request or response. Most front end developers are familiar with these to the extent of setting the `Content-Type` header in their requests to `application/json`. However when you are trying to serve many different types of files it becomes unreasonable to manually create and maintain a list of all the types. Luckily for me I am not the first person to have ever dealt with this problem and therefore there are multiple maintained lists of MIME types already out there. 

What I was looking for was a list of file extensions and their corresponding MIME types. I first came upon the list provided by [IANA](https://www.iana.org/assignments/media-types/media-types.xhtml). This list is good but as I found out it is actually incomplete. For instance if you wanted to get the MIME type for a common file type such as `.jpg` you would find that it isn't present on the list. 

After this realization I searched github and found [mime-db](https://github.com/jshttp/mime-db) a complete database of MIME types conveniently stored in everyone's favorite format, JSON! With this I wrote some code to fetch the file and parse the JSON into a hashmap of `[extension, MIME Type]`. Now when receiving a request I would extract the file extension and use that to determine the MIME type sent in the response.

With this I could easily read the files from the `buckets` and serve them to the user. So I moved on to the next step **Authorization**.

By now I am pretty confident implementing JWT having built and re-built authentication servers for applications at work a few times over. So the next part was fairly simple. I looked a bit for a library to handle the signing of the tokens and it seemed like [jsonwebtoken](https://github.com/Keats/jsonwebtoken) was by far the most popular so I chose to use that. First I need to determine the claims that should go with the token. Since these tokens won't expire all I will really need is `name` (for looking up the cached tokens), `scope` (what buckets can it access), `crt` (Created at timestamp mostly to ensure uniqueness), and `issuer`. And with that I create the Claims struct needed to validate the token.

```rs
// Names are shortened to maintain token compactness
#[derive(Debug, Serialize, Deserialize)]
pub struct Claims {
    /// Name of the token
    pub nm: String,
    /// Bucket scope
    pub scp: String,
    /// Created at
    pub crt: Duration,
    /// Issuer
    pub iss: String,
}
```

Next we need a signing key which prevents someone from forging claims and authenticating to your service. This needs to be kept secret so we will add an environment variable for it called `TOKEN_SECRET`.

With this I can follow the documentation to encode a token and create the following method:

```rs
pub fn create(name: String, scope: String) -> Result<String, Box<dyn Error>> {
    // Get config with the secret
    let config = config::get();

    let timestamp = SystemTime::now().duration_since(UNIX_EPOCH)?;

    // Initialize claims
    let claims = Claims {
        nm: name,
        scp: scope,
        crt: timestamp,
        iss: ISSUER.to_string(),
    };

    // Sign the token
    let token = encode(
        &Header::default(),
        &claims,
        &EncodingKey::from_secret(config.token_secret.as_ref()),
    )?;

    Ok(token)
}
```

With that we can sign tokens but what about validating tokens. Well thats just as simple:

```rs
pub fn validate(token: String) -> Result<TokenData<Claims>, Error> {
    let config = config::get();

    let validation = create_validator();

    decode::<Claims>(
        &token.as_str(),
        &DecodingKey::from_secret(config.token_secret.as_ref()),
        &validation,
    )
}

/// Custom validator so that exp is not required for non expiring tokens
fn create_validator() -> Validation {
    let mut validation = Validation::new(Algorithm::HS256);
    validation.set_issuer(&[ISSUER]);
    validation.set_required_spec_claims(&["iss", "nm", "crt", "scp"]);

    validation
}
```

Really the only complicated part here is creating a custom validator so that you can have tokens that don't expire like we need for esetres.

With this I can now authorize requests but I can't yet create tokens so we will need a way to do that. Again for my application I am hosting on a private VM and it just makes the most sense to only be able to create tokens from the CLI. 

If you are building a CLI in Rust and you aren't using [clap](https://github.com/clap-rs/clap) you my friend are just selling. It is by far the easiest way to create usable CLI applications and does all the heavy lifting for you allowing you to just focus on your application logic. I am going to implement a few different sub commands for working with tokens from the CLI `list`, `mint`, and `revoke`. 

I like to structure my clap applications like this:

```
src
├── main.rs
├── lib.rs
└── commands
    ├── mod.rs
    └── tokens
        ├── mint.rs
        ├── list.rs
        ├── revoke.rs
        └── mod.rs
```

This allows you to keep the routing for the commands separate of the commands and just makes it a bit more reasonable at the cost of a few more files.

With that your main.rs file can look something like this:

```rs
fn main() {
    let args = Cli::parse();

    match args.command {
        Commands::Tokens(cmd) => match cmd {
            commands::Tokens::List => tokens::list::run(),
            commands::Tokens::Mint {
                name,
                scope,
                access,
            } => tokens::mint::run(name, scope, access),
            commands::Tokens::Revoke { name } => tokens::revoke::run(name),
        },
    }
}
```

Thanks for reading and if esetres is the solution you are looking for then give it a try [here](https//github.com/ieedan/esetres).
