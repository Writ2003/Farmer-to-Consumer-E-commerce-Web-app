import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCludinary } from "../utils/cloudinary.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Product } from "../models/product.models.js"
import { User } from "../models/user.models.js";
import { Cart } from "../models/cart.models.js";
//import { Category } from "../models/category.models.js";

const addProducts = asyncHandler(async (req,res) => {
    //get product details from frontend
    //check if any field is not filled, if not filled throw an error
    //check if product already exists
    //validate minQuantity and stock field
    //get the product images
    //if no pics are uploaded, throw an error 
    //upload the product images to cloudinary, check if they are uploaded correctly
    //create product object and upload it to db
    //return response

const {name,price,productDescription,minQuantity,stock,ownerUsername,/*category*/} = req.body;    
    console.log(req.body)
    const owner = await User.findOne({
        username:ownerUsername
    });
    const existingProduct = await Product.findOne(
        {
            $and:[{ name : {$eq : name} },{ productDescription : {$eq: productDescription} }, { ownerId : owner._id} /*{ category }*/]
        }
    )
    console.log(existingProduct);
    if(existingProduct) throw new ApiError(409,"This Product already exists in your Profile");
    if([name,productDescription].some((field)=>field?.trim()==='')) throw new ApiError(400,"All fields are required!");
    if(!(price>0 && minQuantity>0 && stock>0 && stock>=minQuantity)) throw new ApiError(400,"Price, Minimum quantity, Stock field values should be more than 1");
    const productImageLocalPath = req.files?.productImage[0]?.path;
    if(!productImageLocalPath) throw new ApiError(400,"Product Image is required!");
    const productImage = await uploadOnCludinary(productImageLocalPath);
    if(!productImage) throw new ApiError(500,"Unable to upload Product image");
    /*const prodCategoryId = await Category.findOne(category);
    if(!prodCategoryId) throw new ApiError(400,"No Such Product Category is available");*/
    console.log(owner)
    if(!owner) throw new ApiError(400,"No such User or Owner found! Please check your Username");
    const product = await Product.create({
        name:name,
        price:price,
        productDescription:productDescription,
        minQuantity:minQuantity,
        stock:stock,
        ownerId:owner._id,
        productImage:productImage.url,
        //categoryID: prodCategoryId._id
    });
    const createdProduct = await Product.findById(product._id);
    if(!createdProduct) throw new ApiError(500,"Something went wrong while adding this product!");
    return res.status(201).json(
        new ApiResponse(200,"Product added Successfully!",createdProduct)
    )
})

const updateProduct = asyncHandler(async(req,res)=>{
    //get details of the product
    const {name,price,stock} = req.body;
    const userid = req.user?._id;
    //validate product details
    const product = await Product.findOne({
        $and:[{ name : name }, { ownerId : userid }]
    });

    if(!product) throw new ApiError(401,"Invalid Product Request");

    product.stock = stock;
    product.price = price;
    product = await product.save();

    return res.status(201).json(
        new ApiResponse(200,"Updated product details successfully!",product)
    )
})

const addToCart = asyncHandler(async(req,res)=>{
    const { productId, quantity, price } = req.body;
    const userId = req.user._id;
    const user = await User.findById(userId);
    if(!user) throw new ApiError(401,"No User Found!");
    if(!productId || !quantity || !price) throw new ApiError(501,"ProductID or Quantity or Price field is missing");
    const cart = await Cart.findOne({userId:userId});
    if(!cart){
        const newCart = await Cart.create({
            userId,
        });
        if(!newCart) throw new ApiError(501,"Something went wrong!");
        newCart.products.push({productId,quantity,price});
        const cnt = 0;
        newCart.quantity = newCart.products.map(prods => {
            cnt+=prods.quantity;
        })
        newCart.quantity = cnt;
        newCart = await newCart.save();
        user.cartID = newCart._id;
        await user.save({validateBeforeSave:false});
        return res.status(201).json(
            new ApiResponse(200,"Products added to cart!",newCart)
        )
    }
    else{
        const itemIndex = cart.products.findIndex(prods => prods.productID === productId);
        if(itemIndex > -1){
            const product = cart.products[itemIndex];
            product.quantity = quantity;
            product.price = price;
            product.productID = productId;
            cart.products[itemIndex] = product;
            cart = await cart.save();
        }
        else{
            cart.products.push({productID:productId,quantity,price});
            cart = await cart.save();
        }
        return res.status(201).json(
            new ApiResponse(200,"Products added to cart!",newCart)
        )
    }
})

export {addProducts, updateProduct, addToCart}