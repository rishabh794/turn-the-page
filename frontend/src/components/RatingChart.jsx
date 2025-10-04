import React, { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { useTheme } from '../hooks/useTheme';

const RatingChart = ({ reviews }) => {
  const { isDark } = useTheme();
  
  const chartData = useMemo(() => {
    if (!reviews || reviews.length === 0) return [];
    const ratingCounts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    for (const review of reviews) {
      if (ratingCounts[review.rating] !== undefined) {
        ratingCounts[review.rating]++;
      }
    }
    return Object.keys(ratingCounts).map(key => ({
      name: `${key} ★`,
      count: ratingCounts[key],
      rating: parseInt(key)
    }));
  }, [reviews]);

  const getBarColor = (rating) => {
    const colors = {
      1: '#92400E', 
      2: '#DC2626', 
      3: '#EA580C', 
      4: '#FB923C', 
      5: '#FDBA74'  
    };
    return colors[rating] || '#FDBA74';
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white px-4 py-3 rounded-xl shadow-2xl border border-gray-700">
          <p className="font-bold text-lg">{payload[0].payload.name}</p>
          <p className="text-sm text-gray-300">{payload[0].value} review{payload[0].value !== 1 ? 's' : ''}</p>
        </div>
      );
    }
    return null;
  };

  if (!reviews || reviews.length === 0) {
    return (
      <div className={`rounded-2xl p-8 border-2 text-center ${
        isDark
          ? 'bg-gradient-to-br from-gray-700 to-gray-600 border-gray-600'
          : 'bg-gradient-to-br from-orange-50 to-amber-50 border-orange-100'
      }`}>
        <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
          isDark
            ? 'bg-gradient-to-br from-orange-900/50 to-red-900/50'
            : 'bg-gradient-to-br from-orange-200 to-red-200'
        }`}>
          <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        </div>
        <h3 className={`text-xl font-bold mb-2 ${
          isDark ? 'text-gray-100' : 'text-gray-900'
        }`}>No Ratings Yet</h3>
        <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>Be the first to rate this book and help others!</p>
      </div>
    );
  }

  return (
    <div className="mt-4">
      <div className={`rounded-2xl p-6 border-2 shadow-lg ${
        isDark
          ? 'bg-gradient-to-br from-gray-700 to-gray-600 border-gray-600'
          : 'bg-gradient-to-br from-orange-50 via-amber-50 to-red-50 border-orange-200'
      }`}>
        <div className="w-full h-80">
          <ResponsiveContainer>
            <BarChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 5 }}>
              <XAxis 
                dataKey="name" 
                tick={{ fill: isDark ? '#d1d5db' : '#1f2937', fontSize: 14, fontWeight: 700 }}
                axisLine={{ stroke: '#fb923c', strokeWidth: 2 }}
              />
              <YAxis 
                allowDecimals={false}
                tick={{ fill: isDark ? '#9ca3af' : '#4b5563', fontSize: 12, fontWeight: 600 }}
                axisLine={{ stroke: '#fb923c', strokeWidth: 2 }}
                label={{ 
                  value: 'Reviews', 
                  angle: -90, 
                  position: 'insideLeft', 
                  fill: isDark ? '#9ca3af' : '#4b5563', 
                  fontSize: 13, 
                  fontWeight: 700 
                }}
              />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(251, 146, 60, 0.1)' }} />
              <Bar dataKey="count" radius={[12, 12, 0, 0]}>
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={getBarColor(entry.rating)} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className={`flex justify-center gap-4 mt-6 flex-wrap rounded-xl p-4 backdrop-blur-sm ${
          isDark ? 'bg-gray-800/60' : 'bg-white/60'
        }`}>
          <div className={`flex items-center gap-2 px-3 py-2 rounded-full shadow-sm ${
            isDark ? 'bg-gray-700' : 'bg-white'
          }`}>
            <div className="w-3 h-3 rounded-full bg-amber-800"></div>
            <span className={`text-xs font-semibold ${
              isDark ? 'text-gray-300' : 'text-gray-700'
            }`}>Poor</span>
          </div>
          <div className={`flex items-center gap-2 px-3 py-2 rounded-full shadow-sm ${
            isDark ? 'bg-gray-700' : 'bg-white'
          }`}>
            <div className="w-3 h-3 rounded-full bg-red-600"></div>
            <span className={`text-xs font-semibold ${
              isDark ? 'text-gray-300' : 'text-gray-700'
            }`}>Fair</span>
          </div>
          <div className={`flex items-center gap-2 px-3 py-2 rounded-full shadow-sm ${
            isDark ? 'bg-gray-700' : 'bg-white'
          }`}>
            <div className="w-3 h-3 rounded-full bg-orange-600"></div>
            <span className={`text-xs font-semibold ${
              isDark ? 'text-gray-300' : 'text-gray-700'
            }`}>Average</span>
          </div>
          <div className={`flex items-center gap-2 px-3 py-2 rounded-full shadow-sm ${
            isDark ? 'bg-gray-700' : 'bg-white'
          }`}>
            <div className="w-3 h-3 rounded-full bg-orange-400"></div>
            <span className={`text-xs font-semibold ${
              isDark ? 'text-gray-300' : 'text-gray-700'
            }`}>Good</span>
          </div>
          <div className={`flex items-center gap-2 px-3 py-2 rounded-full shadow-sm ${
            isDark ? 'bg-gray-700' : 'bg-white'
          }`}>
            <div className="w-3 h-3 rounded-full bg-orange-300"></div>
            <span className={`text-xs font-semibold ${
              isDark ? 'text-gray-300' : 'text-gray-700'
            }`}>Excellent</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RatingChart;