import {useState, useEffect} from "react";
import {ethers} from "ethers";
import atm_abi from "../artifacts/contracts/Assessment.sol/Assessment.json";

export default function HomePage() {
	
  const [ethWallet, setEthWallet] = useState(undefined);
  const [account, setAccount] = useState(undefined);
  const [atm, setATM] = useState(undefined);
  const [balance, setBalance] = useState(undefined);
  const [formType, setFormType] = useState(null);
  const [num1, setNum1] = useState("");
  const [num2, setNum2] = useState("");
  const [result, setResult] = useState("");

  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const atmABI = atm_abi.abi;
  
  const alignment = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  }

  const styles = {
    main: {
      margin: 0,
      padding: '20px',
      width: '100',
      textAlign: 'center',
      ...alignment,
      fontFamily: 'Lucida Console, Arial, sans-serif'
    },
    header: {
      margin: 0,
      color: "#C0C0C0",
      fontSize: 25
    },
    bodyContainer:{
      width: '100%',
      ...alignment,
      gap: 30

    },
    body: {
      backgroundColor: "#20B2AA",
      width: '50%',
      ...alignment,
      padding: 20,
      color: "#FFFFFF",
      fontSize: 20,
      borderRadius: 10
    },
    buttonContainer: {
      display: 'flex',      
      alignContent: 'space-between',
      gap: 15
    },
    buttonPrimary: {
      backgroundColor: "#C0C0C0",
      fontFamily: 'Lucida Console, Arial, sans-serif',
      padding: 10,
      fontSize: 15,
      fontWeight: 'bold'
    },
    buttonSecondary: {
      backgroundColor: "#C0C0C0",
      fontFamily: 'Lucida Console, Arial, sans-serif',
      padding: 10,
    },
    form: {
      backgroundColor: "#20B2AA",
      width: '100%',
      padding: 10,
      borderRadius: 10,
      color: "#FFFFFF",
      ...alignment,
      alignContent: 'space-between',
      gap: 10,
      textAlign: 'center'
    },
    subtext: {
      ...alignment,
      fontFamily: 'Lucida Console, Arial, sans-serif',
      fontSize: 20
    }
  };

  const getWallet = async() => {
    if (window.ethereum) {
      setEthWallet(window.ethereum);
    }

    if (ethWallet) {
      const account = await ethWallet.request({method: "eth_accounts"});
      handleAccount(account);
    }
  }

  const handleAccount = (account) => {
    if (account && account.length > 0) {
      const activeAccount = account[0];
      console.log("Account connected: ", activeAccount);
      setAccount(activeAccount);
    } else {
      console.log("No account found");
    }
  }

  const connectAccount = async() => {
    if (!ethWallet) {
      alert('MetaMask wallet is required to connect');
      return;
    }
  
    const accounts = await ethWallet.request({ method: 'eth_requestAccounts' });
    handleAccount(accounts);
    
    // once wallet is set we can get a reference to our deployed contract
    getATMContract();
  };

  const getATMContract = () => {
    const provider = new ethers.providers.Web3Provider(ethWallet);
    const signer = provider.getSigner();
    const atmContract = new ethers.Contract(contractAddress, atmABI, signer);
 
    setATM(atmContract);
  }

  const getBalance = async() => {
    if (atm) {
      setBalance((await atm.getBalance()).toNumber());
    }
  }

  const deposit = async() => {
    if (atm) {
      try{
        let tx = await atm.deposit(1);
        await tx.wait()
        getBalance();
      } catch (error){
          alert("Deposit unsuccessful!");
      }

    }
  }

  const withdraw = async() => {
    if (atm) {
      try{
        let tx = await atm.withdraw(1);
        await tx.wait()
        getBalance();
      } catch (error){
        alert("Withdraw unsuccessful!")
      }

    }
  }

  const wwwithdraw = async() => {
    if (atm) {
      let tx = await atm.withdraw(1);
      await tx.wait()
      getBalance();
    }
  }
  
  const addVals = async() => {
    if (atm){ 
      try {
        setResult((await atm.addVals(num1,num2)).toNumber());
        
      } catch (error){
        alert("Error calculating sum:", error.message);
      }
    }
  }
  
  const subVals = async() => {
	if (atm){ 
      try{
          setResult((await atm.subVals(num1,num2)).toNumber());
        
      } catch (error){
        alert("Error calculating difference:", error.message);
      }
    }
  }
  
  const mulVals = async() => {
	if (atm){ 
      try{
          setResult((await atm.mulVals(num1,num2)).toNumber());
        
      } catch (error){
        alert("Error calculating product:", error.message);
      }
    }
  }
  
  const divVals = async() => {
	if (atm){ 
      try{
          setResult((await atm.divVals(num1,num2)).toNumber());
        
      } catch (error){
        alert("Error calculating quotient:", error.message);
      }
    }
  }
  
  const initUser = () => {
    // Check to see if user has Metamask
    if (!ethWallet) {
      return <p>Please install Metamask in order to use this ATM.</p>
    }

    // Check to see if user is connected. If not, connect to their account
    if (!account) {
      return <button style={styles.buttonPrimary} onClick={connectAccount}>Please connect your Metamask wallet</button>
    }

    if (balance == undefined) {
      getBalance();
    }

    return (
      <div style={styles.bodyContainer}>
        <div style={styles.body}>
          <p>Your Account: {account}</p>
          <p>Your Balance: {balance}</p>
          <p>Your Numbers: {num1} and {num2}</p>
          <p>Your Integer Result: {result}</p>
        </div>
        <div style={styles.buttonContainer}>
          <button style={styles.buttonPrimary} onClick={withdraw}>Withdraw 1 ETH</button>
          <button style={styles.buttonPrimary} onClick={deposit}>Deposit 1 ETH</button>
          <button style={styles.buttonPrimary} onClick={() => setFormType("add")}>Add 2 Numbers</button>
			    <button style={styles.buttonPrimary} onClick={() => setFormType("sub")}>Subtract 2 Numbers</button>
			    <button style={styles.buttonPrimary} onClick={() => setFormType("mul")}>Multiply 2 Numbers</button>
			    <button style={styles.buttonPrimary} onClick={() => setFormType("div")}>Divide 2 Numbers</button>
        </div>

        <div className="form">
          {renderForm()}
        </div>
      </div>
    );
  }

  const renderForm = () => {
    const formStyle = {

    };
    switch (formType) {
      case "add":
        return (
          <div style={styles.form}>
            <p>Enter 2 numbers: </p>
              <input
                type="number"
                value={num1}
                onChange={(e) => setNum1(e.target.value)}
              />
			        <input
                type="number"
                value={num2}
                onChange={(e) => setNum2(e.target.value)}
              />
            <button style={styles.buttonSecondary} onClick={addVals} >Add</button>

          </div>
        );
	  case "sub":
        return (
          <div style={styles.form}>
            <p>Enter 2 numbers: </p>
              <input
                type="number"
                value={num1}
                onChange={(e) => setNum1(e.target.value)}
              />
			        <input
                type="number"
                value={num2}
                onChange={(e) => setNum2(e.target.value)}
              />
            <button style={styles.buttonSecondary} onClick={subVals} >Subtract</button>

          </div>
        );
	  case "mul":
        return (
          <div style={styles.form}>
            <p>Enter 2 numbers: </p>
              <input
                type="number"
                value={num1}
                onChange={(e) => setNum1(e.target.value)}
              />
			        <input
                type="number"
                value={num2}
                onChange={(e) => setNum2(e.target.value)}
              />
            <button style={styles.buttonSecondary} onClick={mulVals} >Multiply</button>

          </div>
        );
	  case "div":
        return (
          <div style={styles.form}>
            <p>Enter 2 numbers: </p>
              <input
                type="number"
                value={num1}
                onChange={(e) => setNum1(e.target.value)}
              />
			        <input
                type="number"
                value={num2}
                onChange={(e) => setNum2(e.target.value)}
              />
            <button style={styles.buttonSecondary} onClick={divVals} >Divide</button>

          </div>
        );
    }
  };

  useEffect(() => {getWallet();}, []);
  useEffect(() => {document.body.style.backgroundColor = "#2C2F33"})

  return (
    <main style={styles.main}>
      <header style={styles.header}><h1>Arithmetic ATM</h1></header>
      {initUser()}
    </main>
  )
}