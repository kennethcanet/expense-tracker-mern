const Transaction = require('../models/Transaction');

// @desc    Get all transactions
// @route   GET /api/v1/transations
// @access  Public
exports.getTransactions = async (req,res,next)=>{
    try {
        const transactions = await Transaction.find();
        return res.status(200).json({
            success: true,
            count: transactions.length,
            data: transactions
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
}

// @desc    Add transactions
// @route   POST /api/v1/transations
// @access  Public
exports.addTransactions = async (req,res,next)=>{
    try {
        const {text,amount} = req.body;
        const transaction = await Transaction.create(req.body);
        res.status(201).json({
            success: true,
            data:transaction
        });
        
    } catch (err) {
        if(err.name === 'ValidationError'){
            const messages = Object.values(err.errors).map(val=>val.message);
            return res.status(500).json({
                success: false,
                error: messages
            })
        }else{
            return res.status(500).json({
                success: false,
                error: 'Server error'
            });
        }
    }
}

// @desc    DELETE transactions
// @route   DELETE /api/v1/transations/:id
// @access  Public
exports.deleteTransactions = async (req,res,next)=>{
    try {
        const transaction = await Transaction.findById(req.params.id);
        if(!transaction){
            return res.status(404).json({
                success: false,
                error: 'No transaction found'
            });
        }

        await transaction.remove();

        return res.status(200).json({
            success: true,
            data:{}
        })
    } catch (err) {
        if(err.name === 'ValidationError'){
            const messages = Object.values(err.errors).map(val=>val.messages);
            return res.status(500).json({
                success: false,
                error: messages
            })
        }else{
            return res.status(500).json({
                success: false,
                error: 'Server error'
            });
        }
    }
}