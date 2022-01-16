# The Simpsons Trivia Game
> Welcome to the internet, my friend, how can I help you? 
>  - Homer Simpson

---
## Table of Contents
- [Introduction](#introduction)
- [Prerequisites](#prerequisites)
- [Question Types](#question-types)
- [Design Notes](#design-notes-and-thoughts)

README last updated: January 15, 2022
---

## Introduction

The Simpsons Trivia Game has been designed to run in Node.js runtime environment. With a variety of questions presented in an A,B,C,D multiple choice style, you can test your Simpsons knowledge and see how SMRT you are.

---

## Prerequisites
Please have all of the following configured and ready to use on your local machine:
- [Node.js and NPM](https://nodejs.org/en/download/)

---

## Question Types
* Easy, medium, hard, or 'mixed bag'.

Categories can be:
* General
* Music
* Episode Specific Details
* Characters

---

## Design Notes and Thoughts
1. Chose the difficulties for different JSON files so that a difficulty category can be added into the game loop. This should also allows for more flexability in adding to the question categories within the different JSON files.
