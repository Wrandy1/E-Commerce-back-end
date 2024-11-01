const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const categories = await Category.findAll({
      include: [{ model: Product }]
    });

    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const category = await Category.findByPk(req.params.id, {
      include: [{ model: Product }]
    });

    if (!category) {
      res.status(404).json({ message: "No matching category" })
      return;
    }

    res.status(200).json(category);
  } catch (error) {
    res.status(500).json(error);
  }
  
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const category = await Category.create(req.body);

    res.status(200).json(category);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.put('/:id', async(req, res) => {
  // update a category by its `id` value
  try {
    const updatedCategory = await Category.update(req.body, {
      where: { id: req.params.id },
    });

    if (!updatedCategory[0]) {
      res.status(404).json({ message: "No matching category" });
      return;
    }

    res.status(200).json(updatedCategory);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const deleteCategory = await Category.destroy({
      where: { id: req.params.id }
    })

    if (!deleteCategory) {
      res.status(400).json({ message: "No matching category"});
      return;
    }

    res.status(200).json(deleteCategory);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
