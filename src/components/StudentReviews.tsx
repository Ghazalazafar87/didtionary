import React from 'react';
import { SAMPLE_REVIEWS } from '../data/products';
import { Star, CheckCircle, Quote } from 'lucide-react';

export const StudentReviews: React.FC = () => {
  return (
    <section className="py-14 sm:py-20 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="text-xs font-bold text-purple-700 uppercase tracking-wider mb-1.5">
            Student Community Love
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
            Loved Across Pakistani Campuses
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 mt-2">
            From late-night library sessions in Lahore to medical rotations in Karachi.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SAMPLE_REVIEWS.map((rev) => (
            <div
              key={rev.id}
              className="bg-white p-6 rounded-2xl border border-stone-200/80 shadow-xs flex flex-col justify-between"
            >
              <div>
                {/* Rating Stars & Date */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-[11px] text-stone-400">{rev.date}</span>
                </div>

                {/* Comment */}
                <p className="text-xs sm:text-sm text-stone-700 leading-relaxed italic mb-4">
                  "{rev.comment}"
                </p>
              </div>

              {/* Author & College Tag */}
              <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-xs sm:text-sm text-stone-900">
                      {rev.author}
                    </span>
                    {rev.verified && (
                      <span title="Verified Pakistani Student Order">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-purple-700 font-medium">
                    {rev.institution} · {rev.city}
                  </p>
                </div>

                <div className="text-stone-300">
                  <Quote className="w-6 h-6 rotate-180" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
