
## List of Frame Works Used

1) Tailwind Css
2) Vite
3) Json server
4) Vue
5) Vue-router
6) Vue-toaastification
7) Primeicons
8) Tanstack vue query


## How to Setup the project

## Step 1
Open your vs code termincal or laptop terminal and input git clone https://github.com/EssienJoy/vue-task-management-project.git

## Step 2
Open the folder in vs code

## Step 3 
use 'npm install' in the terminal to maually install all the project

## Step 4 
use "npm run dev" to manually create a local host

## Step 5
use "npm run server" in another terminal to host the local json server

## Reusable Compoents
the ui folder contains reusable input,button,etc components used all through out the app.

## State Management
1) Api call data was managed with tanstack vue,which also handle the loading,success,error states.
2) auth global data was handled using composabls,that serve as reusable data anywhere in the app.
3) ref and current were used to handle ractive states in small component blocks.

## Known Issues
it takes time for changes to be invalidated, for example if a ticket is deleted,it might take some time for updates to be shown
which could be a big issue to user accessibility and experience cause of bug is still unknown.

## Accessibility
isAuthentucated state ismanaged on read only if websites reload or user reload automatically,they would instantly be logged out and have to log back in to start.

