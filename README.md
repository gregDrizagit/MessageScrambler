Hey Fuzz! 

https://message-scrambler-greg-driza.herokuapp.com/

I cracked the code! I figured out what the message was through inspecting the page elements. The first thing that I noticed is that each character was wrapped in a span and that some spans had a 'hidden' attribute. I manually deleted the first few hidden attributes and uncovered the word 'Elegantly'. I then got all elements from the dom with 

let spans = document.body.getElementsByTagName('span')

Once I had all of the spans I looped over them and pulled the innerHTML for each element that had a hidden attribute.

let messageString = ''

 for(let i = 0; i < spans.length; i++){
  	if(spans[i].hasAttribute('hidden')){

      messageString += spans[i].innerText

    }   
}

console.log(messageString)

To get: Elegantly unscramble this message using the space provided. Then write the scrambler that made it. The answer is an object with global scope that can scramble and unscramble any text any number of times.

I put together a react app that demonstrates this functionality. 
