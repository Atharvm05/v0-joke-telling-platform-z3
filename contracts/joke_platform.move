module joke_platform::joke_platform {
    use sui::object::{Self, UID};
    use sui::transfer;
    use sui::tx_context::{Self, TxContext};
    use std::string::{Self, String};
    use sui::clock::{Self, Clock};
    use sui::event;

    // Error codes
    const EInvalidContent: u64 = 1;
    const EInvalidCategory: u64 = 2;

    // Structs
    struct Joke has key, store {
        id: UID,
        content: String,
        author: address,
        category: String,
        likes: u64,
        timestamp: u64,
    }

    struct Meme has key, store {
        id: UID,
        title: String,
        image_url: String,
        author: address,
        category: String,
        likes: u64,
        timestamp: u64,
    }

    struct JokePlatform has key {
        id: UID,
        total_jokes: u64,
        total_memes: u64,
    }

    // Events
    struct JokeAdded has copy, drop {
        joke_id: address,
        author: address,
        content: String,
        category: String,
    }

    struct MemeAdded has copy, drop {
        meme_id: address,
        author: address,
        title: String,
        category: String,
    }

    struct ContentLiked has copy, drop {
        content_id: address,
        liker: address,
        new_like_count: u64,
    }

    // Initialize the platform
    fun init(ctx: &mut TxContext) {
        let platform = JokePlatform {
            id: object::new(ctx),
            total_jokes: 0,
            total_memes: 0,
        };
        transfer::share_object(platform);
    }

    // Add a new joke
    public entry fun add_joke(
        platform: &mut JokePlatform,
        content: vector<u8>,
        category: vector<u8>,
        clock: &Clock,
        ctx: &mut TxContext
    ) {
        let content_string = string::utf8(content);
        let category_string = string::utf8(category);
        
        assert!(!string::is_empty(&content_string), EInvalidContent);
        assert!(!string::is_empty(&category_string), EInvalidCategory);

        let joke = Joke {
            id: object::new(ctx),
            content: content_string,
            author: tx_context::sender(ctx),
            category: category_string,
            likes: 0,
            timestamp: clock::timestamp_ms(clock),
        };

        let joke_id = object::uid_to_address(&joke.id);
        
        event::emit(JokeAdded {
            joke_id,
            author: tx_context::sender(ctx),
            content: content_string,
            category: category_string,
        });

        platform.total_jokes = platform.total_jokes + 1;
        transfer::public_transfer(joke, tx_context::sender(ctx));
    }

    // Add a new meme
    public entry fun add_meme(
        platform: &mut JokePlatform,
        title: vector<u8>,
        image_url: vector<u8>,
        category: vector<u8>,
        clock: &Clock,
        ctx: &mut TxContext
    ) {
        let title_string = string::utf8(title);
        let image_url_string = string::utf8(image_url);
        let category_string = string::utf8(category);
        
        assert!(!string::is_empty(&title_string), EInvalidContent);
        assert!(!string::is_empty(&category_string), EInvalidCategory);

        let meme = Meme {
            id: object::new(ctx),
            title: title_string,
            image_url: image_url_string,
            author: tx_context::sender(ctx),
            category: category_string,
            likes: 0,
            timestamp: clock::timestamp_ms(clock),
        };

        let meme_id = object::uid_to_address(&meme.id);
        
        event::emit(MemeAdded {
            meme_id,
            author: tx_context::sender(ctx),
            title: title_string,
            category: category_string,
        });

        platform.total_memes = platform.total_memes + 1;
        transfer::public_transfer(meme, tx_context::sender(ctx));
    }

    // Like a joke
    public entry fun like_joke(
        joke: &mut Joke,
        ctx: &mut TxContext
    ) {
        joke.likes = joke.likes + 1;
        
        event::emit(ContentLiked {
            content_id: object::uid_to_address(&joke.id),
            liker: tx_context::sender(ctx),
            new_like_count: joke.likes,
        });
    }

    // Like a meme
    public entry fun like_meme(
        meme: &mut Meme,
        ctx: &mut TxContext
    ) {
        meme.likes = meme.likes + 1;
        
        event::emit(ContentLiked {
            content_id: object::uid_to_address(&meme.id),
            liker: tx_context::sender(ctx),
            new_like_count: meme.likes,
        });
    }

    // Getter functions
    public fun get_joke_content(joke: &Joke): String {
        joke.content
    }

    public fun get_joke_author(joke: &Joke): address {
        joke.author
    }

    public fun get_joke_likes(joke: &Joke): u64 {
        joke.likes
    }

    public fun get_meme_title(meme: &Meme): String {
        meme.title
    }

    public fun get_meme_author(meme: &Meme): address {
        meme.author
    }

    public fun get_meme_likes(meme: &Meme): u64 {
        meme.likes
    }
}
