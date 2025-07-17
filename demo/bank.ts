class BankOfKigali {
  private _accountBalance = 0;
  private _loanBalance = 0;

  get accountBalance(): number {
    return this._accountBalance;
  }

  get loanBalance(): number {
    return this._loanBalance;
  }

  set accountBalance(newAccountBalance: number | string) {
    const balance = Number(newAccountBalance);
    if (Number.isFinite(balance)) {
      this._accountBalance = balance;
    } else {
      throw new Error("Number is not finite and invalid ...");
    }
  }

  set loanBalance(newLoanBalance: number | string) {
    const balance = Number(newLoanBalance);

    if (Number.isFinite(balance)) {
      this._loanBalance = balance;
    } else {
      throw new Error("Number is not finite and invalid ...");
    }
  }

  set deposit(amount : number | string ){
    const balance = Number(amount)
    if(balance < 0) throw new Error ("Amount should be positive")
    if(Number.isFinite(balance)){
      this._accountBalance += balance
      console.log(`You have successfully Deposited: ${balance}`)
      console.log(`New Balance is: ${this.accountBalance}`)
    }else throw new Error("Number is not finite and invalid ...")
  }

  set withdraw(amount : number | string ){
    const balance = Number(amount)
    if(balance < 0) {
      console.log("Amount should be positive")
    }else if(balance > this.accountBalance ){
      console.log("Insufficient Funds!")
    }else if (balance < this.accountBalance){
      this.accountBalance -= balance

      console.log("you have withdrown the amount: ", amount)
      console.log("New Balance: ", this._accountBalance)
    }
  }
}


const client = new BankOfKigali()

client.deposit = 100500
client.withdraw = 500
client.accountBalance = 200
client.withdraw = 1000000
client.deposit = 1763