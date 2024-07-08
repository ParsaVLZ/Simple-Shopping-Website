const { Schema, model, Types } = require('mongoose');

const CategorySchema = new Schema({
    name: {type: String, required: true},
    slug: {type: String, required: true, index: true},
    parent: {type: Types.ObjectId, ref: 'Category', required: false},
    parents: {type: [Types.ObjectId], id:false, toJson: { virtuals: true }}
},{versionKey: false, id: false,timestamps: true});

CategorySchema.virtual('children', {
    ref: 'Category',
    localField: '_id',
    foreignField: 'parent'
});

function autopopulate(next){
    this.populate([{ path: 'children'}]);
    next()
}

CategorySchema.pre('find', autopopulate).pre('findOne', autopopulate);

const CategoryModel = model('Category', CategorySchema);

module.exports = CategoryModel;