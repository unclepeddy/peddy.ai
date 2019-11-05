---
title: TikTok and The Rise of Composable Content
---
Ever since hearing Gustav Soderstorm (Head of Research at Spotify) [describe](https://www.youtube.com/watch?v=v-9Mpe7NhkM&t=31m18s) spotify users creating playlists as a form of meta-programming, I’ve started to realize that as tooling and technologies for content creation increase in sophistication, we can apply more and more concepts from the world of programming to that of content creation because in a way, content creation is simply programming in languages (or media) that have an irregular grammar. This essay is an exercise in applying this insight.

Recently, a lot of people have wondered what has driven TikTok’s unprecedented growth and how this product differs from other social media platforms. Most explanations focus on the content consumption side and take the form “They are good at using AI to personalize the experience”  ([example](https://a16z.com/2018/12/03/when-ai-is-the-product-the-rise-of-ai-based-consumer-apps/)). While I’m aware of this truth (ByteDance is one of the most sophisticated users of the deep learning technology I work on), I think the highest order differentiator is actually concerning the content creator experience. 

Below, I describe why I think TikTok’s approach to composable content creation fundamentally changes the way its ecosystem cultivates Trends and cultural norms, allowing it to grow more quickly and have a deeper impact on humanity than other platforms. 
 
## Content Platforms
 
Content creation is an extremely important part of entertainment, business and labor markets.
Youtube, Vine, Reddit, Medium, Twitter, Instagram, etc. are all products that are built upon the premise of giving billions of users some fairly basic tools, a large addressable audience and the opportunity to unleash their creativity by creating content that captures the attention of that audience. That attention of course closely tracks monetary value and will continue to be an extremely important commodity, discussed [here](http://preprint.peddy.ai/attention).


The engine that drives content platforms can be roughly understood in terms of the following 3 main functions:

* Creators produce content for 1) their targeted audience (followers/subscribers) and 2) the total addressable market of consumers on the platform  
* Consumers consume content from 1) a targeted set of creators and 2) all creators on the platform (through search, recommendations, etc.)
* The content leaks outside the platform by 1) directly being shared on other platforms, or 2) becoming a Trend or cultural artifact that infiltrates our lives and becomes part of the vernacular, both of which drive new creators and consumers to the platform.


The implementation of the first 2 dictates the internal mechanics of the platform (how content is produced, surfaced, highlighted, ranked, recommended and consumed) while that of the third determines the way in which the platform acquires new creators and consumers. Let’s analyze how a few traditional content platforms implement each function in a bit more depth. 
 
## Traditional Content Platforms
On the creator side, while some platforms (ex: Youtube) have a high bar for content (in terms of substance, presentation, post-production editing, etc.), others (Twitter, Instagram, Twitch) push a low-tech, low-effort creator experience, which lowers the barrier to entry and allows more consumers to convert to becoming a creators and existing creators to create more content.
However, the platforms in the second camp pay a price: due to the inherent simplicity they allow, each piece of content is less engaging, less likely to leave a lasting effect on users and thus has a lower chance of contributing to the gravitational pull of the platform (the third function), bringing in fewer new users.


In fact there is a direct trade-off platforms have to face: the simpler the content format(s) the platform is built for, the larger the addressable creator population, but on the other hand, the less likely each piece of content is to leave a lasting impression on consumers.


This is why to capture the sustained attention of large groups of users, most platforms rely on Trends. A Trend is a cohort of content, tied together via some means, that receives the attention of a considerable portion of the user base of the platform at a given point in time. How exactly the individual pieces of content in a Trend can be tied together differs: sometimes it’s referencing an issue, sometimes re-using a song, choreography, challenge or dance, and sometimes simply a form of presenting an idea. 


Most platforms have their own sophisticated infrastructure for identifying and product surface for presenting and amplifying these cohorts of content. Youtube has Trending, Twitter has highlights, Instagram has Discover, Facebook has Top Stories/Top News, etc. The point is that Trends are a powerful tool via which platforms highlight and amplify content that is likely to impress large groups of users, thereby giving them a thread of shared context. This shared context of course is usually carried beyond the confines of the platform, improving the inbound gravitational pull of the platform.


Because most producers on these platforms are also consumers, the content they produce is influenced by the Trends the platform promotes, which greatly helps some Trends take off and be self-sustaining. This begs the question: if Trends as important to a platform as I claim, why is this not common knowledge? The answer is the experience that traditional content platforms have created for Trend consumption has two major shortcomings:

1) Most platforms promote Trends to users in a context outisde of their primary feed of content. Facebook's timeline and Instagram's feed only contains content from accounts the user explicitly follows. This creates a major friction point for interacting with trendy content.

2) Perhaps more importantly, on traditional content platforms, Trends are often short-lived and isolated from other Trends, which forces them to have relatively short shelf-lives. This short shelf-life imposes an unnecessary upper-bound on the total engagement a Trend produces, which limits the value ($) that each produces and more importantly, it means that viral topics are less likely to be in the spotlight long enough to have deep impact on users (especially after they leave the platform). 

Let's explore how TikTok's approach to content solves both of these problems, allowing it to unlock much more value from Trends than traditional content platforms.
 
## TikTok: Composable Content
 
Simply put, on TikTok, instead of being created from scratch, most content is created by composing already-existing _ideas_ and _content_.
 
### Syntactic and Semantic Composability

For those with a background in mathematics, an object's ability to be arbitrarily composed is an important and well defined characteristic. For the rest of us... we can think about composability as the ability to mix and match _inputs_ and _outputs_ arbitrarily. This means I can create a TikTok using some components (audio, text, video), and anyone else can use any of those pieces (inputs) or my TikTok as a whole (output) as a part of their TikTok. The power comes from the fact that this can be nested an arbitrary number of times.


Tapping into a bit of programming terminology, we can describe this composability being implemented both at a syntactic as well as a semantic level.


If we view a TikTok post as composed of audio, video, pictures, text and effects, we can think of the syntax of a post as the specific configuration in which the user arranges (and creates) these elements. When users want to create a new post, they can create all of these elements from scratch; but TikTok makes it extremely easy (and perhaps the norm) to reuse audio-bites, videos (Duets), text and effects from existing content.


In addition to taking such concrete components, more abstract concepts can also be composed such as video format, choreography, facial expressions, body movements, monologue, scenarios, etc. I refer to this as the semantics of a post as its meaning is not only a function of the contents of the post itself, but also one of the surrounding environment in which it has been created. Many of the most popular mini-choreos or sequences that become viral on TikTok lack hermeticity and require a few other Trends (upon which they’ve been built) to be understood and appreciated. This is composability at the semantic level: taking a popular Trend well understood by the user base, adding a twist to it to create a new Trend, of which a large portion is already well liked and understood, making it likely to be well received by the user base.


While there is no one specific feature in the application that facilitates semantic composition, because of how ingrained borrowing bits and pieces from other pieces of content is in TikTok’s culture, this form of composability is welcome and commonplace.
 
### Impact of Composability
 
While at the surface, creators’ ability to mix & match and build on top of the work of others looks like simply a cool product feature, it has important implications for the platform. Obviously, this lowers the barrier to entry for creating content, increasing the probability that any given consumer becomes a producer and adds to the pie of content. But more importantly, if we look back at the dynamics model of popularity of content across these platforms, we see why this is an incredibly important distinction.
 
The users' ability to easily compose (build on top of) other content means that TikTok Trends (popular songs, remixes, sound-bites, choreographies, formats, scenarios, references) are no longer isolated. Each popular Trend will enjoy being in the spotlight in its own right, but then will be built upon by many other Trends, allowing it to live both on its own, and through other related Trends much longer than it would have on a platform where composability is not as common.
 
In fact it means that there are no more well-defined Trends, each distinct from the next. For every successful viral Trend, there will be many attempts to build a Trend on top of it. Most will fail, but a few will succeed. Some of those derived Trends will be so alike the original one that we could label them the same thing, making it extremely difficult to reason about Trend boundaries. This also has the side-effect that most content is created in the context of an already-existing Trend, which makes it possible to make consuming trendy content the primary mode of using the platform: for most users, it's more enjoyable to consume their "For You" feed rather than "Following" because its content builds on shared context (Trends that they already understand); note that this addresses problem #1 of Trends mentioned above.
 
On TikTok, successful Trends tend to snowball into others and live on for much longer than they would have been able to on their own. The longevity and omnipresence of some of the more successful Trends will provide them with more exposure than they could have enjoyed on any other platform, causing them to have deep and profound impact on the platform’s consumers, following them back into the real world. Daily Active Users may be exposed to instances of the same (or variations of the same) Trend multiple times every day for weeks or months, which will slowly creep into their culture in the real world. This allows Tiktok to not only have high platform gravity, but also organically execute the sought-after online-to-offline strategy that content platforms existentially need to feed their engagement loop. Note that this addresses problem #2 of Trends mentioned above.

While Twitter can affect the language we use and Instagram the moments that we seek to share with others, Tik Tok will have a deep impact on every corner of human behavior because it has a created a global factory of Trend creation, and a product that can turn any single Trend into a widespread habit via highly-tuned, sustained exposure.
