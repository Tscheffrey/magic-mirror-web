import annyang from 'annyang'

var commands = {
   'magic *command': function(command) {
     if(command == 'sleep') console.log('go to sleep')
     else if(command == 'wake up') console.log('wake up')
     else console.log('did not unterstand:', command);
   }
 };

 //annyang.debug()

 // Add our commands to annyang
 annyang.addCommands(commands)

 // Start listening.
 annyang.start()
