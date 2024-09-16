# HTN2024 - personalnote

## Inspiration

As students, you probably all have played around with AI chatbots and (possibly) ran a couple homework problems through them. But, as you might have noticed, traditional chat bots have their drawbacks: 1. sometimes providing inaccurate information, and 2. not referencing the course material we want...

Our team believed in a solution where we could easily feed in course notes, textbooks, and a variety of personalized source material to learn and practice off of. This way, we can create much more accurate, course-based answers and practice material on the go!

## What it does

Personalnote is an application that allows its users to feed in .pdfs, text files, and images into its system as datasets. Then, each file is interpreted and trained off of. Once trained, users will be able to create practice questions using flashcards, study note summaries, and solutions to problems.

For example, a user could upload their course textbook for calculus and ask for practice problems for an upcoming test. Like a personal tutor, Personalnote will respond with worked examples using extremely similar approaches as referenced in the textbook. As each response is pre-trained by each user, users can be more prepared for assessments on course material and receive significantly more accurate information.

## How we built it

    Database - Supabase
    Backend - Python, Flask, OpenAI api
    Frontend - Typescript, React, Next.js

The majority of our file processing/training was done through OpenAI's new file search and vector stores feature.

## Challenges we ran into

Our team was formed at the icebreaker events late Friday, and almost all of us were first-time hackathon attendees. Originally, we wanted to build our solution using Voiceflow's apis for their knowledge-based agents. But, we ran into a lot of trouble setting them up so ended up switching gears to OpenAI with only around a day left... It was definitely a time-crunching project!

## Accomplishments that we're proud of

- It was an incredible experience to have something working by the end of such a short time period!
- Finally seeing our product working
- New friends!

## What we learned

Pretty much almost everything we worked was new to us! From learning the basics of web like communicating between frontend and backend to just having fun with LLMs, working on a project like this really allowed us to touch on many new skills. Also, OpenAI's file search feature was really cool and easy to use and we plan on trying it out more in the future.
What's next for personalnote.study

We'd like to try out mobile app development which could make it much easier to use our image scanning feature.

