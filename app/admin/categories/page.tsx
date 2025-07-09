'use client'
import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { FiPlus,FiEdit2,FiTrash2,FiSearch,FiFilter,FiChevronDown,FiChevronRight,FiEye,FiMoreVertical,FiCheck,FiX} from 'react-icons/fi'
import { toast } from 'react-hot-toast'
import categoryService, { Category, CategoryFormData } from '../../services/categoryService'
import CategoryForm from '../../components/admin_components/CategoryForm'
import DeleteConfirmationModal from '../../components/admin_components/DeleteConfirmationModal'
import { useFormik } from 'formik'
import * as Yup from 'yup'


export default function Categories() {
  const { t } = useTranslation();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [expandedCategories, setExpandedCategories] = useState<Set<number>>(new Set());
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState<Category | null>(null);

  const [formData, setFormData] = useState<CategoryFormData>({
    name: '',
    description: '',
    parent_id: null,
    status: 'active',
    sort_order: 0,
    meta_title: '',
    meta_description: ''
  });

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await categoryService.getCategories({ limit: 1000 });
      setCategories(response.categories);
    } catch (error) {
      console.error('Error fetching categories:', error);
      toast.error(t('admin.categories.failedToLoad', 'Failed to load categories'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleOpenModal = (category?: Category) => {
    if (category) {
      setEditingCategory(category);
      setFormData({
        name: category.name,
        description: category.description || '',
        parent_id: category.parent_id || null,
        status: category.status,
        sort_order: category.sort_order,
        meta_title: category.meta_title || '',
        meta_description: category.meta_description || ''
      });
    } else {
      setEditingCategory(null);
      setFormData({
        name: '',
        description: '',
        parent_id: null,
        status: 'active',
        sort_order: 0,
        meta_title: '',
        meta_description: ''
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingCategory(null);
    setFormData({
      name: '',
      description: '',
      parent_id: null,
      status: 'active',
      sort_order: 0,
      meta_title: '',
      meta_description: ''
    });
  };

  const handleSubmit = async (formData: CategoryFormData) => {
    setSubmitLoading(true);
    try {
      if (editingCategory) {
        // Update category
        await categoryService.updateCategory(editingCategory.id, formData);
        toast.success(t('admin.categories.categoryUpdated', 'Category updated successfully'));
      } else {
        // Create category
        await categoryService.createCategory(formData);
        toast.success(t('admin.categories.categoryCreated', 'Category created successfully'));
      }
      
      await fetchCategories();
      handleCloseModal();
    } catch (error: any) {
      console.error('Error saving category:', error);
      toast.error(error.message || t('admin.categories.failedToSave', 'Failed to save category'));
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleDelete = async (category: Category) => {
    setCategoryToDelete(category);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!categoryToDelete) return;

    setDeleteLoading(true);
    try {
      await categoryService.deleteCategory(categoryToDelete.id);
      toast.success(t('admin.categories.categoryDeleted', 'Category deleted successfully'));
      await fetchCategories();
      setShowDeleteModal(false);
      setCategoryToDelete(null);
    } catch (error: any) {
      console.error('Error deleting category:', error);
      toast.error(error.message || t('admin.categories.failedToDelete', 'Failed to delete category'));
    } finally {
      setDeleteLoading(false);
    }
  };

  const toggleExpanded = (categoryId: number) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(categoryId)) {
      newExpanded.delete(categoryId);
    } else {
      newExpanded.add(categoryId);
    }
    setExpandedCategories(newExpanded);
  };

  const filteredCategories = categories.filter(category => {
    const matchesSearch = category.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || category.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getParentCategories = () => {
    return categories.filter(cat => !cat.parent_id);
  };





const formik = useFormik({
    initialValues:{
      name: '',
      description: '',
      parent_id: null,
      status: 'active',
      sort_order: 0,
      meta_title: '',
      meta_description: ''
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Required'),
      description: Yup.string(),
      parent_id: Yup.number(),
      status: Yup.string().required('Required'),
      sort_order: Yup.number(),
      meta_title: Yup.string(),
      meta_description: Yup.string()
    }),
    onSubmit: handleSubmit
})














  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {t('admin.categories.title', 'Categories Management')}
          </h1>
          <p className="text-gray-600">
            {t('admin.categories.subtitle', 'Manage your product categories and subcategories')}
          </p>
        </div>

        {/* Actions Bar */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder={t('admin.categories.searchPlaceholder', 'Search categories...')}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Status Filter */}
              <div className="relative">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">{t('admin.categories.allStatus', 'All Status')}</option>
                  <option value="active">{t('admin.categories.active', 'Active')}</option>
                  <option value="inactive">{t('admin.categories.inactive', 'Inactive')}</option>
                </select>
                <FiChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </div>

            {/* Add Category Button */}
            <button
              onClick={() => handleOpenModal()}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <FiPlus size={20} />
              {t('admin.categories.addCategory', 'Add Category')}
            </button>
          </div>
        </div>

        {/* Categories Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t('admin.categories.category', 'Category')}
                  </th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t('admin.categories.parent', 'Parent')}
                  </th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t('admin.categories.status', 'Status')}
                  </th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t('admin.categories.products', 'Products')}
                  </th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t('admin.categories.sortOrder', 'Sort Order')}
                  </th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t('admin.categories.actions', 'Actions')}
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {loading ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                      {t('admin.categories.loadingCategories', 'Loading categories...')}
                    </td>
                  </tr>
                ) : filteredCategories.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                      {t('admin.categories.noCategoriesFound', 'No categories found')}
                    </td>
                  </tr>
                ) : (
                  filteredCategories.map((category) => (
                    <React.Fragment key={category.id}>
                      <tr className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            {category.subcategories && category.subcategories.length > 0 && (
                              <button
                                onClick={() => toggleExpanded(category.id)}
                                className="mr-2 p-1 hover:bg-gray-100 rounded"
                              >
                                {expandedCategories.has(category.id) ? (
                                  <FiChevronDown size={16} />
                                ) : (
                                  <FiChevronRight size={16} />
                                )}
                              </button>
                            )}
                            <div>
                              <div className="font-medium text-gray-900">{category.name}</div>
                              <div className="text-sm text-gray-500">{category.slug}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {category.parent_name || '-'}
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            category.status === 'active' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {category.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {category.products_count}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {category.sort_order}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleOpenModal(category)}
                              className="text-blue-600 hover:text-blue-800 p-1 hover:bg-blue-50 rounded"
                              title="Edit"
                            >
                              <FiEdit2 size={16} />
                            </button>
                            <button
                              onClick={() => handleDelete(category)}
                              className="text-red-600 hover:text-red-800 p-1 hover:bg-red-50 rounded"
                              title="Delete"
                            >
                              <FiTrash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                      
                      {/* Subcategories */}
                      {expandedCategories.has(category.id) && category.subcategories?.map((subcat) => (
                        <tr key={subcat.id} className="bg-gray-50">
                          <td className="px-6 py-4 pl-12">
                            <div className="flex items-center">
                              <div className="w-4 h-4 border-l border-b border-gray-300 mr-2"></div>
                              <div>
                                <div className="font-medium text-gray-900">{subcat.name}</div>
                                <div className="text-sm text-gray-500">{subcat.slug}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-500">
                            {subcat.parent_name}
                          </td>
                          <td className="px-6 py-4">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              subcat.status === 'active' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-red-100 text-red-800'
                            }`}>
                              {subcat.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-500">
                            {subcat.products_count}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-500">
                            {subcat.sort_order}
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => handleOpenModal(subcat)}
                                className="text-blue-600 hover:text-blue-800 p-1 hover:bg-blue-50 rounded"
                                title="Edit"
                              >
                                <FiEdit2 size={16} />
                              </button>
                              <button
                                onClick={() => handleDelete(subcat)}
                                className="text-red-600 hover:text-red-800 p-1 hover:bg-red-50 rounded"
                                title="Delete"
                              >
                                <FiTrash2 size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </React.Fragment>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Category Form Modal */}
        <CategoryForm
          isOpen={showModal}
          onClose={handleCloseModal}
          onSubmit={handleSubmit}
          editingCategory={editingCategory}
          formData={formData}
          setFormData={setFormData}
          parentCategories={getParentCategories()}
          loading={submitLoading}
          formik={formik} // Pass formik to CategoryForm
        />

        {/* Delete Confirmation Modal */}
        <DeleteConfirmationModal
          isOpen={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
          onConfirm={confirmDelete}
          category={categoryToDelete}
          loading={deleteLoading}
        />
      </div>
    </div>
  );
}
