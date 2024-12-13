---
title: I love Rust and I could give a f@#k about performance
description: Many people turn to Rust for performance or security reasons but even if you aren't primarily concerned with either Rust is still a great choice for building applications.
date: 2024-6-18
---

Many people turn to Rust for performance or security reasons but even if you aren't primarily concerned with either Rust is still a great choice for building applications.

Rust is a language that pushes the envelope in many different ways (I promise I'm not talking about the borrow checker). Rust brings high level simplicity to low level tasks and eliminates many of the arguments we see over other languages.

Rust provides high level apis to solve problems you shouldn't have to think about. For example how might you iterate over every line in a file in JavaScript?

Maybe something like this:

```js
file.split('\n').forEach((line) => {
	//...
});
```

How about:

```rs
for line in file.lines() {
    //...
}
```

Now that is of course the same amount of lines and disregarding the character count pretty much reads the same but how are you handling the `\r` carriage returns? Rust already thought of this for you and automatically trims them if they are in sequence with the `\n` character. This is just one example of how Rust can save you time and prevent silly mistakes by doing some extra work for you.

If you're coming from a background with a language like JavaScript we'll agree that we hate classes. Now while I do hate classes the utility they provide in name-spacing your functions in quite nice. Rust gives you the ability to namespace things in a functional way with modules.

If you are familiar with a language such as C# name-spacing is something you are familiar with however in C# you are forced to either fully qualify the class or specify the namespace by having a `using` at the top of your file, there is no `partial` qualification.

This would look something like this:

```csharp
using MyApp.Functions;

Functions.Start();

// or ...

MyApp.Functions.Start();
```

With Rust you can partially qualify allowing you to do this:

```rs
use crate::functions;

functions::start();
```

or this:

```rs
crate::functions::start();
```

This allows for the name-spacing utility of classes without the code smell.

One of the other things that I love about Rust is option types. Option types can add some verbosity to your code but they also allow you to model things much more flexibly. How might you model a user with an optional phone number in another language?

TypeScript:

```ts
type User = {
	name: string;
	phoneNumber: string | null;
};
```

In TypeScript you will get an error when trying to access `phoneNumber` if you don't null check it.

```ts
const user: User = { name: 'Aidan', phoneNumber: null };

user.phoneNumber.endsWith('4444'); // 'user.phoneNumber' is possibly 'null'.
```

But contrary to popular belief swiggly lines in your editor don't actually do anything and if you were to run this code in your browser it will work so long as `phoneNumber` always has a value.

In Rust your code will not compile without handling the `None` case of `phone_number`.

```rs
struct User {
    name: String,
    phone_number: Option<String>,
}

fn main() {
    let user = User { name: "Aidan".to_string(), phone_number: None };

    user.phone_number.ends_with("4444");
    // no method named `ends_with` found for enum `Option` in the current scope method not found in `Option<String>`
}
```

Here Rust has just prevented a fatal bug before the program could even be built. If you were to have shipped the TypeScript code, as soon as you ran into a case where the `phoneNumber` was null you would've got `Cannot read properties of null (reading 'endsWith')` and your program would've crashed.

Another way that Rust differs from other languages is enums. Many languages have enums but none quite like Rust. An enum in TypeScript or C# looks pretty much the same across both languages.

```ts
enum IpAddr {
	IPV4,
	IPV6,
}
```

Their functionality is really just limited to improving readability without really being able to enforce and sort of control flow.

```ts
let ip = "127.0.0.1";

switch getIpAddressType(ip) {
    case IpAddr.IPV4:
        // do something
        break;
    // "do this or don't do this I don't care" - TypeScript
    case IpAddr.IPV6:
        // do something
        break;
}
```

Rust improves enums by allowing them to hold values and adding syntax and checks to make them part of your control flow.

For example I want to determine the type of the IP address and use it accordingly. With enums in Rust this is far more rigid than in other languages.

```rs
enum IpAddr {
    V4(Ipv4Addr),
    V6(Ipv6Addr),
}

fn main() -> Result<()> {
    let ip = IpAddr::from_str("127.0.0.1")?;

    match ip {
        IpAddr::V4(address) => {
            // do something
        }
        IpAddr::V6(address) => {
            // do something
        }
    }

    Ok(())
}
```

With this I am forced to handle the case which the IP Address is V4 or V6. Forgetting to do so will prevent the program from compiling.

But I haven't even talked about one of the most revolutionary features of Rust, Traits. Traits allow you to define custom behavior on types that you don't own. For example you want to add a method to `String` that allows you to prepend another string.

In C# we call these extension methods and they can be created how all things are created in C#, with a class (eye roll).

```csharp
public static class PrependExtension {
    public static string Prepend(this string str, string prepend) {
        return prepend + str;
    }
}
```

To implement this behavior in Rust you would use a Trait.

```rs
trait Prepend {
    fn prepend(self, prepend: &str) -> String;
}

impl Prepend for &str {
    fn prepend(self, prepend: &str) -> String {
        return prepend.to_string() + self;
    }
}
```

While it is more code initially anyone else who wants to implement the prepend behavior simply has to implement the trait for their type. Many packages that export traits will also include derive macros to automatically implement traits for you.

Traits can also be used similarly to interfaces in other languages where you can use traits to define a type based on the traits it implements. This can be accomplished by using the `impl` keyword with the interface that you want the type to implement.

```rs
fn say_hello(name: impl Prepend) {
    println!("{}", name.prepend("Hello "));
}
```

This by itself isn't unique but what makes this powerful is when you want to enforce multiple trait implementations on a type. This is done with the `+` operator.

```rs
fn say_hello(name: impl Prepend + Sized) {
    println!("{}", name.prepend("Hello "));
}
```

Error handling is also different in Rust. Instead of having Exceptions like many other languages Rust offers 2 methods of handling errors.

The first method is much like exceptions except they cannot be caught, this is called panicking. When something panics the program stops no matter where it is. This could be triggered in a few different ways either by calling the `panic!` macro directly or by calling the `.unwrap()` method on a `Result` or `Option` type that is `Err` or `None`.

```rs
fn main() {
    panic!("Oh no!");
}
```

However a much better way to handle errors is to use the `Result` type. When writing your functions you can return `Result` to force the caller to handle the error condition of your function.

Take the following function to get the file extension from a file name:

```rs
fn get_extension(file_name: &str) -> Result<String, io::Error> {
    let index = file_name.rfind(".");
    if let Some(index) = index {
        let (_, ext) = file_name.split_at(index + 1);
        Ok(ext.to_string())
    } else {
        Err(io::Error::new(
            io::ErrorKind::NotFound,
            "Couldn't find the extension.",
        ))
    }
}
```

Since we return `Result` we force the caller to handle the `Err` condition. The caller can do this in a few different ways.

Panic if the function returns an error:

```rs
let extension = get_extension("welcome.txt").unwrap();
```

Handle the error with an `if let` or a `match` statement:

```rs
if let Ok(extension) = get_extension("welcome.txt") {
    // do something with extension
} else {
    // do something else
}
```

Use the `?` operator to automatically return the `Err` result from the parent function:

```rs
fn main() -> Result<(), Box<dyn std::error::Error>> {
    let extension = get_extension("welcome.txt")?;

    println!("{}", extension);

    Ok(())
}
```

With this pattern it is much easier to keep track of places in your program that can cause it to panic and to ensure that all error cases are handled.

Rust also comes out of the box with formatting and linting which enforces preferences not across your project, but across the language. This makes code across different Rust projects consistent and prevents arguments about code style preferences.

All variables names use `snake_case` or `SCREAMING_SNAKE_CASE` for constants (also enforced by Rust). With traits, structs and enums all using `pascalCase`. This makes it easy to identify everything in your project and is a convention that is widely used throughout other languages as well.

Rust has its own package manager [cargo](https://crates.io/). Cargo has many different features that make publishing and consuming `crates` a great experience. One of the most notable being `features`. Features allow you to include or exclude code from the package based on what is enabled in the `cargo.toml` file.

Here I enable the `fuzzy-select` feature on the dialoguer package by specifying it in my `cargo.toml`.

```toml
dialoguer = { version = "0.11.0", features = ["fuzzy-select"] }
```

This helps reduce the size of the package to just what you need without having to install a specific package targeted at reducing the size of the parent package.

Another feature Rust provides is testing. With Rust writing tests is as simple as adding a module for tests and then running `cargo test`.

Here's an example straight out of the Rust book:

```rs
pub fn add(left: usize, right: usize) -> usize {
    left + right
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn it_works() {
        let result = add(2, 2);
        assert_eq!(result, 4);
    }
}
```

Rust also recognizes the value of tests to describe your code and enables automated tests for your documentation:

```rs
/// # Add
/// Adds the left to the right and returns the result
///
/// ```
/// use example::add;
///
/// let res = add(1, 2);
///
/// assert_eq!(res, 3);
/// ```
///
pub fn add(left: usize, right: usize) -> usize {
    left + right
}
```

This way someone using the function can see the tests as an example just by hovering in their editor.

Rust has so many useful features that make it easy to love even ignoring performance and safety. For a complicated language it simplifies many things and provides high level apis for low level operations.

For many learning Rust is the main barrier to entry. If you are trying to get into Rust I encourage to read the [Rust Book](https://doc.rust-lang.org/book/title-page.html) by the time you finish chapter 11 you should have an excellent understanding of how the language works.