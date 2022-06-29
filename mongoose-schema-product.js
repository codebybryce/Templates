const mongoose = require('mongoose');



const reviewSchema = new mongoose.Schema({
    user:{
        type: String,
        
    },
    stars:{
        type: Number,
        enum:[1,2,3,4,5],
        
    },
    description:{
        type: String,
        

    }  
})

const variationSchema = new mongoose.Schema({
    variationTitle:String,
    parentVariation: mongoose.SchemaTypes.ObjectId,
    variationType:String,
    variationName:String,
    variationSku:String,
    variationPhoto:[String],
})
export const productSchema = new mongoose.Schema(
    {   
        title: {
            type: String,
            required:true,
        },
        details:{
            modelNumber:String,
            productType:String,
            brand:String,         
            sku:String,
            reviews:reviewSchema,
        },
        photoURL:[String],
        pricing:{
            pricingUSD:{
                type: Number,
                get: v => (v/100).toFixed(2),
                set: v => v*100,
            },
            costUSD:{
                type: Number,
                get: v => (v/100).toFixed(2),
                set: v => v*100,
            },
        },
        isAvailable:Boolean,
        onSale:Boolean,
        discount:Boolean,
        isDS:Boolean,
        shipsFromZip:Number,
        variationRelation:{
            type: String,
            enum: ["Parent", "Child"],
        },
        variationData: variationSchema,
        // relates data to another object
        tags:[String],
        reviews:reviewSchema,
        published:{
            type:Date,
            immutable:true,
            default:()=>Date.now(),
        },
        updated:{
            type:Date,
            default: ()=>Date.now(),
        }
    },
    {
        toJSON: {getters:true}
    }
)
module.exports= mongoose.model("Product", productSchema)
