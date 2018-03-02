# -*- coding:utf-8 -*-
import hashlib
import json
from time import time
from uuid import uuid4


class Blockchain(object):
    def __init__(self):
        self.chain = []
        self.current_transactions = []
        #Create the genesis block
        #创建创世块
        self.new_block(previous_hash=1,proof=100)
    def new_block(self,proof,previous_hash=None):
        #Creates a new Block and adds it to the chain
        # 创建一个新区块并添加到链末尾
        """
        生成新快
        :param proof: <int> The proof given by the Proof of Work algorithm
                            工作证明算法给出的证明
        :param previous_hash: (Optional) <str> Hash of previous Block
                            上一个区块的哈希值
        :return:<dict> New Block
                            返回新的区块
        """
        block = {
            'index': len(self.chain) + 1,
            'timestamp': time(),
            'transactions': self.current_transactions,
            'proof':proof,
            'previous_hash': previous_hash or self.hash(self.chain[-1]),
        }
    def new_transaction(self,sender,recipient,amout):
        #Adds a new transaction to the list of transaction
        # 添加一个新的交易到交易列表
        """
        生成新交易信息，信息将加入到下一个待挖的区块中
        :param sender: <str> Address of the Sender
                        发送者的地址
        :param recipient: <str> Address of the Recipient
                        接收者的地址
        :param amout: <int> Amout
                        金额
        :return: <int> The index of the Block that will hold this trasaction
                        返回持有此交易的区块索引
        """
        self.current_transactions.append({
            'sender':sender,
            'recipient':recipient,
            'amout':amout,
        })
        return self.last_block['index'] + 1

    @property
    def last_block(self):
        #Return the last Block in the chain
        #返回区块链上最后一个区块
        return self.chain[-1]

    @staticmethod
    def hash(block):
        #Hashes a Block
        #哈希一个区块
        """
        生成块的SHA-256 hash值
        :param block: <dict> Block
        :return: <str>
        """
        #We must make sure that the Dictionary is Ordered, or we'll have inconsistent hashes
        #我们必须确保这个字典是有序的，否则我们会得到不一致的哈希值
        block_string = json.dump(block,sort_keys=True).encode()
        return hashlib.sha256(block_string).hexigest()

    def proof_of_work(self,last_proof):
        """
        简单的工作量证明：
            -查找一个p'，使得hash(pp')以4个0开头
            -p是上一个块的证明,p'是当前的证明
        :param last_proof: <int>
        :return: <int>
        """
        proof = 0
        while self.vaild_proof(last_proof,proof) is False:
            proof += 1
        return proof

    @staticmethod
    def valid_proof(last_proof,proof):
        """
        验证证明:是否hash(last_proof)上一个以4个0开头?
        :param last_proof: <int> Previous Proof 上个证明
        :param proof: <int> Current Proof   当前证明
        :return: <bool> True if correct, False if not.
        """
        guess = '{last_proof}{proof}'.encode()
        guess_hash = hashlib.sha256(guess).hexdigest()
