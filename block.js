const SHA256 = require('crypto-js/sha256');
// npm install --save crypto-js 

class Block{                                                        //Create a basic constructor 
    constructor(index, timestamp, data, previousHash = ''){
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = '';
    }

    calculateHash(){
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString();
    }
}

class Blockchain{
    constructor(){
        this.chain = [this.createGenesisBlock()];
    }

    createGenesisBlock(){
        return new Block(0, "01/01/2000", "Genesis Block", "0");
    }

    getLatestBlock(){
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock){
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
    }
}

let testBlock = new Blockchain();
testBlock.addBlock(new Block(1, "01/01/2001", { amount: 10}));
testBlock.addBlock(new Block(2, "01/01/2002", { amount: 20}));

console.log(JSON.stringify(testBlock, null, 4));

// IN ORDER TO RUN THIS 
// node block.js

//Expected Output
/* {
    "chain": [
        {
            "index": 0,
            "timestamp": "01/01/2000",
            "data": "Genesis Block",
            "previousHash": "0",
            "hash": ""
        },
        {
            "index": 1,
            "timestamp": "01/01/2001",
            "data": {
                "amount": 10
            },
            "previousHash": "",
            "hash": "83fe657d55cd701d70e444b3a4c96a36b166d4053b932b63990f859154be5957"
        },
        {
            "index": 2,
            "timestamp": "01/01/2002",
            "data": {
                "amount": 20
            },
            "previousHash": "83fe657d55cd701d70e444b3a4c96a36b166d4053b932b63990f859154be5957",
            "hash": "3d6f92b86c303f825a82cb3a064aa477e8431a86a483f7ac31de4617beae7375"
        }
    ]
} */

// In order to check the valididty os the blockchain 
isChainValid(){
    for(let i = 1; i < this.chain.length; i++){
        const currentBlock = this.chain[i];
        const previousBlock = this.chain[i - 1];

        if(currentBlock.hash !== currentBlock.calculateHash()){
            return true;
        }

        if(currentBlock.previousHash !== previousBlock.hash){
            return false;
        }

    }
    return true;
}

console.log('Is blockchain is valid!' + testBlock.isChainValid());
