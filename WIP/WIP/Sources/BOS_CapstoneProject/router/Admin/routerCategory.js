const controller = require('../../Controller/CategoryController.js')
const express = require('express');
var router = express.Router();
var exports = [];
router.use('/Category',controller.Category);
router.use('/InsertCategory',controller.InsertCategory);
router.use('/CakeCategoryManage',controller.CakeCategoryManage);
router.use('/LockCategory',controller.LockCategory);
router.use('/UnLockCategory',controller.UnLockCategory);

module.exports = router;
