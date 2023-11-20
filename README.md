# Arithmetic ATM

This program is an assimilation of my first ETH + AVAX Project with the ATM Function Frontend template provided by Metacrafters.  
It has the 4 basic arithmetic operations as functions from my first project and the withdraw and deposit functions from the template.

## Getting Started

### Source Code Content

This program has the following capabilities:

1. **Information Window**
	- Once you have connected your metamask, this window will be the first one to show up. 
	- This window will show the address of the account you're using and its balance. 
	- It will also show the numbers you have put in and the result of whatever operation you use the numbers in.  

2. **Withdraw 1 ETH**:
	- This button calls for your Metamask wallet to confirm the transation and subtracts one ETH from your account. 

3. **Deposit 1 ETH**:
	- This button calls for your Metamask wallet to confirm the transation and adds one ETH from your account. 
	
4. **Add 2 Integers**:
	- This button pops up a window below and asks for 2 integers. 
	- Once input, press the add button and the sum will show in the window above after the `Your integer Result:`. 

5. **Subtract 2 Integers**:
	- This button pops up a window below and asks for 2 integers. 
	- Once input, press the subtract button and the difference will show in the window above after the `Your integer Result:`. 

5. **Multiply 2 Integers**:
	- This button pops up a window below and asks for 2 integers. 
	- Once input, press the multiply button and the product will show in the window above after the `Your integer Result:`. 

7. **Divide 2 Integers**:
	- This button pops up a window below and asks for 2 integers. 
	- Once input, press the divide button and the quotient will show in the window above after the `Your integer Result:`. 

### Setting up the Program

To run this program, you can use Gitpod, an CDE or cloud development environemt. To get started, you can begin by opening a workspace of my code [here](https://gitpod.io/new/#https://github.com/KermitSudoku/Eth-Avax-Project-2). 

Once you are on Gitpod, do the following instructions:

1.  Inside the project directory, in the terminal type: npm i
2.  Open two additional terminals in your VS code
3.  In the second terminal type: npx hardhat node
4.  In the third terminal, type: npx hardhat run --network localhost scripts/deploy.js
5.	Back in the first terminal, type npm run dev to launch the front-end.

You can continue developing while both the Gitpod tab and front-end tab are open as Gitpod updates and compiles in real time.

### Using the program

Once the front-end is deployed, you first need to have a Metamask wallet or another wallet of the same nature. 
After that you need to connect the front-end with said wallet to continue interacting with the program. 
Once you're in the main page, you can withdraw or deposit ETH into your account, or use the simple arithmetic operations but it can only operate with integers.

## Authors

Jarod Jangcan
[KermitSudoku](https://github.com/KermitSudoku)

