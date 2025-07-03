import React, { useState, useEffect } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { config } from '../../config/api'
import { useTranslation } from 'react-i18next'

// Validation schema
const reviewSchema = Yup.object().shape({
  comment: Yup.string()
    .min(10, 'Comment must be at least 10 characters')
    .required('Comment is required'),
  rating: Yup.number()
    .min(1, 'Rating must be at least 1 star')
    .max(5, 'Rating cannot exceed 5 stars')
    .required('Rating is required')
})

// Star Rating Component
const StarRating = ({ rating, onRatingChange = null, readonly = false }) => {
  const [hoveredRating, setHoveredRating] = useState(0)

  const handleClick = (starValue) => {
    if (!readonly && onRatingChange) {
      onRatingChange(starValue)
    }
  }

  const handleMouseEnter = (starValue) => {
    if (!readonly) {
      setHoveredRating(starValue)
    }
  }

  const handleMouseLeave = () => {
    if (!readonly) {
      setHoveredRating(0)
    }
  }

  return (
    <div className="flex items-center">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`w-5 h-5 cursor-pointer transition-colors ${
            star <= (hoveredRating || rating) 
              ? 'text-yellow-400 fill-current' 
              : 'text-gray-300'
          } ${readonly ? 'cursor-default' : 'hover:text-yellow-400'}`}
          onClick={() => handleClick(star)}
          onMouseEnter={() => handleMouseEnter(star)}
          onMouseLeave={handleMouseLeave}
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}

export default function Product_Review({ product }: any) {
  const { t } = useTranslation()
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)
  const [showAddReview, setShowAddReview] = useState(false)

  // Validation schema with translations
  const reviewSchema = Yup.object().shape({
    comment: Yup.string()
      .min(10, t('productReview.commentMin'))
      .required(t('productReview.commentRequired')),
    rating: Yup.number()
      .min(1, t('productReview.ratingMin'))
      .max(5, t('productReview.ratingMax'))
      .required(t('productReview.ratingRequired'))
  })

  // Fetch reviews
  const fetchReviews = async () => {
    try {
      const response = await axios.get(
        `${config.url}/api/reviews?filters[product_id][$eq]=${product.id}`,
        {
          headers: {
            Authorization: `Bearer ${config.token}`,
          },
        }
      )
      setReviews(response.data.data || [])
    } catch (error) {
      console.error('Error fetching reviews:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (product?.id) {
      fetchReviews()
    }
  }, [product?.id])

  // Calculate average rating
  const averageRating = reviews.length > 0 
    ? reviews.reduce((sum, review) => sum + parseFloat(review.rating), 0) / reviews.length 
    : 0

  const handleSubmitReview = async (values, { setSubmitting, resetForm }) => {
    try {
      await axios.post(
        `${config.url}/api/reviews`,
        {
          data: {
            comment: values.comment,
            rating: values.rating.toString(),
            product_id: product.id
          }
        },
        {
          headers: {
            Authorization: `Bearer ${config.token}`,
          },
        }
      )
      
      // Refresh reviews after successful submission
      await fetchReviews()
      resetForm()
      setShowAddReview(false)
      
    } catch (error) {
      console.error('Error submitting review:', error)
      alert(t('productReview.errorSubmitting'))
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="h-6 bg-gray-300 rounded w-1/4 mb-4"></div>
        <div className="space-y-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-20 bg-gray-300 rounded"></div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">{t('productReview.customerReviews')}</h3>
          {reviews.length > 0 && (
            <div className="flex items-center gap-2">
              <StarRating rating={averageRating} readonly={true} />
              <span className="text-sm text-gray-600">
                {averageRating.toFixed(1)} {t('productReview.outOf5')} ({reviews.length} {reviews.length !== 1 ? t('productReview.reviews') : t('productReview.review')})
              </span>
            </div>
          )}
        </div>
        <button
          onClick={() => setShowAddReview(!showAddReview)}
          className="bg-main hover:bg-second text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
        >
          {showAddReview ? t('productReview.cancel') : t('productReview.writeReview')}
        </button>
      </div>

      {/* Add Review Form */}
      {showAddReview && (
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <h4 className="text-lg font-semibold mb-4">{t('productReview.writeAReview')}</h4>
          <Formik
            initialValues={{ comment: '', rating: 0 }}
            validationSchema={reviewSchema}
            onSubmit={handleSubmitReview}
          >
            {({ values, setFieldValue, isSubmitting }) => (
              <Form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('productReview.rating')}
                  </label>
                  <StarRating
                    rating={values.rating}
                    onRatingChange={(rating) => setFieldValue('rating', rating)}
                  />
                  <ErrorMessage name="rating" component="div" className="text-red-500 text-sm mt-1" />
                </div>

                <div>
                  <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-2">
                    {t('productReview.comment')}
                  </label>
                  <Field
                    as="textarea"
                    name="comment"
                    rows="4"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder={t('productReview.commentPlaceholder')}
                  />
                  <ErrorMessage name="comment" component="div" className="text-red-500 text-sm mt-1" />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-main hover:bg-second text-white px-6 py-2 rounded-lg hover:bg-indigo-700 disabled:bg-gray-400 transition-colors"
                >
                  {isSubmitting ? t('productReview.submitting') : t('productReview.submitReview')}
                </button>
              </Form>
            )}
          </Formik>
        </div>
      )}

      {/* Reviews List */}
      <div className="space-y-4">
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <div key={review.id} className="border-b pb-4 last:border-b-0">
              <div className="flex items-center justify-between mb-2">
                <StarRating rating={parseFloat(review.rating)} readonly={true} />
                <span className="text-sm text-gray-500">
                  {new Date(review.createdAt).toLocaleDateString()}
                </span>
              </div>
              <p className="text-gray-700 leading-relaxed">{review.comment}</p>
            </div>
          ))
        ) : (
          <div className="text-center py-8">
            <div className="text-gray-400 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <p className="text-gray-500 text-lg">No reviews yet</p>
            <p className="text-gray-400 text-sm">Be the first to review this product!</p>
          </div>
        )}
      </div>
    </div>
  )
}
