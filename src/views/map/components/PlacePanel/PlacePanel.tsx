import dayjs from 'dayjs';
import { FormEvent, useEffect, useState } from 'react';
import { Button, Input } from '@/components/ui';
import { Place, placesService, Review } from '@/services/places';
import {
  categoryColor,
  categoryIcon,
  categoryLabel,
  formatDistance,
  formatRating,
  placeTitle,
  websiteHref,
} from '@/views/map/formatPlace';

const RATING_VALUES = [1, 2, 3, 4, 5];

type PlacePanelProps = {
  place: Place & { distance?: number };
  onUpdated: (place: Place) => void;
  onClose: () => void;
};

const formatCreatedAt = (value: string) => {
  const date = dayjs(value);
  return date.isValid() ? date.format('DD.MM.YYYY HH:mm') : value;
};

export const PlacePanel = ({ place, onUpdated, onClose }: PlacePanelProps) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [reviewsLoading, setReviewsLoading] = useState(true);
  const [reviewsError, setReviewsError] = useState<string | null>(null);
  const [rating, setRating] = useState<number | null>(null);
  const [text, setText] = useState('');
  const [formError, setFormError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    setReviewsLoading(true);
    setReviewsError(null);

    placesService
      .getReviews(place.id, controller.signal)
      .then((items) => {
        if (!controller.signal.aborted) setReviews(items);
      })
      .catch(() => {
        if (!controller.signal.aborted) setReviewsError('Не вдалося завантажити відгуки');
      })
      .finally(() => {
        if (!controller.signal.aborted) setReviewsLoading(false);
      });

    return () => controller.abort();
  }, [place.id]);

  const reloadReviews = async () => {
    const items = await placesService.getReviews(place.id);
    setReviews(items);
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (submitting) return;

    if (!rating || rating < 1 || rating > 5) {
      setFormError('Оберіть оцінку від 1 до 5');
      return;
    }

    const trimmed = text.trim();
    if (trimmed.length > 1000) {
      setFormError('Текст не довший за 1000 символів');
      return;
    }

    setFormError(null);
    setSubmitting(true);

    try {
      const updated = await placesService.createReview(place.id, {
        rating,
        ...(trimmed ? { text: trimmed } : {}),
      });
      onUpdated(updated);
      setText('');
      await reloadReviews();
    } catch {
      setFormError('Не вдалося зберегти відгук');
    } finally {
      setSubmitting(false);
    }
  };

  const details: Array<{
    label: string;
    value: string;
    href?: string;
    external?: boolean;
  }> = [];

  if (place.phone) {
    details.push({ label: 'Телефон', value: place.phone, href: `tel:${place.phone}` });
  }
  if (place.hours) details.push({ label: 'Графік', value: place.hours });
  if (place.website) {
    details.push({
      label: 'Сайт',
      value: place.website,
      href: websiteHref(place.website),
      external: true,
    });
  }
  if (place.address) details.push({ label: 'Адреса', value: place.address });

  const CategoryIcon = categoryIcon[place.category];

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p
            className="inline-flex items-center gap-1 text-xs font-medium"
            style={{ color: categoryColor(place.category) }}
          >
            <CategoryIcon
              size={14}
              color={categoryColor(place.category)}
            />
            {categoryLabel(place.category)}
          </p>
          <h5 className="text-base font-semibold text-gray-900 dark:text-gray-100">
            {placeTitle(place.name, place.category)}
          </h5>
          <p className="mt-1 text-sm text-gray-500">
            Рейтинг {formatRating(place.ratingAvg, place.ratingCount)}
          </p>
          {typeof place.distance === 'number' && (
            <p className="mt-1 text-sm text-gray-500">{formatDistance(place.distance)} від вас</p>
          )}
        </div>
        <Button
          size="sm"
          variant="plain"
          type="button"
          onClick={onClose}
        >
          Закрити
        </Button>
      </div>

      {details.length > 0 && (
        <dl className="flex flex-col gap-2 text-sm">
          {details.map((item) => (
            <div key={item.label}>
              <dt className="text-gray-400">{item.label}</dt>
              <dd className="break-all text-gray-900 dark:text-gray-100">
                {item.href ? (
                  <a
                    href={item.href}
                    className="text-primary hover:underline"
                    {...(item.external ? { target: '_blank', rel: 'noreferrer' } : {})}
                  >
                    {item.value}
                  </a>
                ) : (
                  item.value
                )}
              </dd>
            </div>
          ))}
        </dl>
      )}

      <form
        className="flex flex-col gap-3"
        onSubmit={handleSubmit}
      >
        <div>
          <p className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-200">Ваша оцінка</p>
          <div className="flex gap-1">
            {RATING_VALUES.map((value) => (
              <button
                key={value}
                type="button"
                aria-label={`${value} з 5`}
                className={`h-9 w-9 rounded-lg border text-sm font-semibold ${
                  rating !== null && value <= rating
                    ? 'border-amber-400 bg-amber-400 text-white'
                    : 'border-gray-200 text-gray-500 dark:border-gray-600'
                }`}
                onClick={() => setRating(value)}
              >
                {value}
              </button>
            ))}
          </div>
        </div>
        <Input
          textArea
          rows={3}
          maxLength={1000}
          placeholder="Коментар, необов’язково"
          value={text}
          onChange={(event) => setText(event.target.value)}
        />
        <p className="text-xs text-gray-400">Повторна оцінка замінить ваш попередній відгук.</p>
        {formError && <p className="text-sm text-red-500">{formError}</p>}
        <Button
          variant="solid"
          type="submit"
          loading={submitting}
          disabled={submitting}
        >
          Залишити відгук
        </Button>
      </form>

      <div className="flex flex-col gap-3">
        <h6 className="text-sm font-semibold text-gray-800 dark:text-gray-100">Відгуки</h6>
        {reviewsLoading && <p className="text-sm text-gray-500">Завантаження відгуків…</p>}
        {reviewsError && <p className="text-sm text-red-500">{reviewsError}</p>}
        {!reviewsLoading && !reviewsError && reviews.length === 0 && (
          <p className="text-sm text-gray-500">Відгуків ще немає</p>
        )}
        {reviews.map((review) => (
          <article
            key={review.id}
            className="rounded-xl border border-gray-200 p-3 dark:border-gray-700"
          >
            <div className="flex items-center justify-between gap-3 text-sm">
              <span className="font-medium text-gray-900 dark:text-gray-100">
                {review.rating} з 5
              </span>
              <time className="text-gray-400">{formatCreatedAt(review.createdAt)}</time>
            </div>
            {review.text && (
              <p className="mt-2 text-sm whitespace-pre-wrap text-gray-700 dark:text-gray-200">
                {review.text}
              </p>
            )}
          </article>
        ))}
      </div>
    </div>
  );
};
