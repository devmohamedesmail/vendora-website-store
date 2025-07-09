'use client'
import React from 'react'

import { useTranslation } from 'react-i18next'
import { Category, CategoryFormData } from '../../services/categoryService'
import CustomInput from '../../custom/custom_input'
import { FiPlus, FiEdit2, FiTrash2, FiSearch, FiFilter, FiChevronDown, FiChevronRight, FiEye, FiMoreVertical, FiCheck, FiX } from 'react-icons/fi'
import Custom_Textarea from '../../custom/custom_textarea'
interface CategoryFormProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (formData: CategoryFormData) => Promise<void>;
    editingCategory: Category | null;
    formData: CategoryFormData;
    setFormData: React.Dispatch<React.SetStateAction<CategoryFormData>>;
    parentCategories: Category[];
    loading?: boolean;
    formik?: any;
}

export default function CategoryForm({
    isOpen,
    onClose,
    onSubmit,
    editingCategory,
    formData,
    setFormData,
    parentCategories,
    loading = false,
    formik
}: CategoryFormProps) {
    const { t } = useTranslation();

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await onSubmit(formData);
    };

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen px-4">
                <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose}></div>
                <div className="bg-white rounded-lg max-w-2xl w-full p-6 relative z-10 max-h-[90vh] overflow-y-auto">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-semibold">
                            {editingCategory ? t('admin.categories.editCategory', 'Edit Category') : t('admin.categories.addCategory', 'Add Category')}
                        </h2>
                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-gray-600"
                            disabled={loading}
                        >
                            <FiX size={24} />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                            <CustomInput
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                label={t('admin.categories.categoryName')}
                                name="name"
                                error={formik.touched.name ? formik.errors.name : undefined} />

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    {t('admin.categories.parentCategory', 'Parent Category')}
                                </label>
                                <select
                                    value={formData.parent_id || ''}
                                    onChange={(e) => setFormData({ ...formData, parent_id: e.target.value ? Number(e.target.value) : null })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    disabled={loading}
                                >
                                    <option value="">{t('admin.categories.noneTopLevel', 'None (Top Level)')}</option>
                                    {parentCategories.map(cat => (
                                        <option key={cat.id} value={cat.id} disabled={editingCategory?.id === cat.id}>
                                            {cat.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    {t('admin.categories.status', 'Status')}
                                </label>
                                <select
                                    value={formData.status}
                                    onChange={(e) => setFormData({ ...formData, status: e.target.value as 'active' | 'inactive' })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    disabled={loading}
                                >
                                    <option value="active">{t('admin.categories.active', 'Active')}</option>
                                    <option value="inactive">{t('admin.categories.inactive', 'Inactive')}</option>
                                </select>
                            </div>



                            <CustomInput
                                type='number'
                                value={formik.values.sort_order}
                                onChange={formik.handleChange}
                                label={t('admin.categories.categoryName')}
                                name="sort_order"
                                error={formik.touched.sort_order ? formik.errors.sort_order : undefined} />
                        </div>



                        <Custom_Textarea
                            label='Description'
                            value={formik.values.description}
                            onChange={formik.handleChange}
                            name="description"
                            error={formik.touched.description ? formik.errors.description : undefined}
                            placeholder="Enter category description"
                            rows={3}

                        />

                        <div className="border-t pt-4">
                            <h3 className="text-lg font-medium text-gray-900 mb-3">SEO Settings</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                               
                                <Custom_Textarea
                                    label='meta_title'
                                    value={formik.values.meta_title}
                                    onChange={formik.handleChange}
                                    name="meta_title"
                                    error={formik.touched.meta_title ? formik.errors.meta_title : undefined}
                                    placeholder="meta_title"
                                    rows={3}

                                />

                               
                                 <Custom_Textarea
                                    label='meta_description'
                                    value={formik.values.meta_description}
                                    onChange={formik.handleChange}
                                    name="meta_description"
                                    error={formik.touched.meta_description ? formik.errors.meta_description : undefined}
                                    placeholder="meta_description"
                                    rows={3}

                                />
                            </div>
                        </div>

                        <div className="flex justify-end gap-3 pt-4 border-t">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
                                disabled={loading}
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                                disabled={loading}
                            >
                                {loading && (
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                )}
                                {editingCategory ? 'Update Category' : 'Create Category'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
