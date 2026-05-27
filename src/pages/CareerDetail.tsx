import { useParams, Link } from "react-router-dom";
import { useGetCareerByIdQuery } from "../services/careersApi";
import { Briefcase, MapPin, Clock, Share2 } from "lucide-react";
import { trackEvent } from '../utils/analytics';
import Header from "../components/Header";
import Footer from "../components/Footer";
import { toSafeRichText, stripToPlainText } from "../utils/formatText";
import Seo from "../components/Seo";
import type { Career } from "../types/content";

const CareerDetail = () => {
  const { id } = useParams();
  const { data, isLoading, isError } = useGetCareerByIdQuery(id ?? "", { skip: !id });
  const career: Career | undefined = data;

  if (isError)
    return (
      <>
        <Header />
        <div className="text-center text-red-600 py-16 text-lg">Unable to load career details. Please try again.</div>
        <Footer />
      </>
    );

  if (isLoading || !career)
    return (
      <>
        <Header />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 mb-10 pt-24">
          {/* Header Skeleton */}
          <div className="border-b pb-4 flex flex-wrap items-start justify-between gap-4">
            <div>
              <div className="h-8 bg-gray-200/60 dark:bg-white/5 rounded w-1/2 animate-pulse mb-3"></div>
              <div className="flex flex-wrap items-center gap-3">
                <div className="h-4 bg-gray-200/60 dark:bg-white/5 rounded w-36 animate-pulse"></div>
                <div className="h-4 bg-gray-200/60 dark:bg-white/5 rounded w-28 animate-pulse"></div>
                <div className="h-4 bg-gray-200/60 dark:bg-white/5 rounded w-32 animate-pulse"></div>
              </div>
            </div>
            <div className="h-9 w-24 bg-gray-200/60 dark:bg-white/5 rounded-md animate-pulse mt-2"></div>
          </div>
          {/* Description Skeleton */}
          <div className="mt-2 space-y-3">
            <div className="h-4 bg-gray-200/60 dark:bg-white/5 rounded w-full animate-pulse"></div>
            <div className="h-4 bg-gray-200/60 dark:bg-white/5 rounded w-full animate-pulse"></div>
            <div className="h-4 bg-gray-200/60 dark:bg-white/5 rounded w-5/6 animate-pulse"></div>
          </div>
          {/* Job Details Skeleton */}
          <div className="bg-bg-secondary rounded-2xl shadow-sm p-6 mt-4">
            <div className="h-6 bg-gray-200/60 dark:bg-white/5 rounded w-1/3 mb-4 animate-pulse"></div>
            <div className="space-y-3">
              <div className="h-3 bg-gray-200/60 dark:bg-white/5 rounded w-full animate-pulse"></div>
              <div className="h-3 bg-gray-200/60 dark:bg-white/5 rounded w-full animate-pulse"></div>
              <div className="h-3 bg-gray-200/60 dark:bg-white/5 rounded w-5/6 animate-pulse"></div>
              <div className="h-3 bg-gray-200/60 dark:bg-white/5 rounded w-3/4 animate-pulse"></div>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );

  return (
    <>
      {career && (
        <Seo
          title={career.title}
          description={stripToPlainText(career.description).slice(0, 160)}
          canonical={`https://syntheseed.com/careers/${career.id}`}
          openGraph={{
            title: career.title,
            description: stripToPlainText(career.description).slice(0, 160),
            image: '/assets/og-image.png',
            url: `https://syntheseed.com/careers/${career.id}`,
          }}
          jsonLd={{
            '@context': 'https://schema.org',
            '@type': 'JobPosting',
            title: career.title,
            description: stripToPlainText(career.description),
            datePosted: career.posted_on || new Date().toISOString(),
            employmentType: career.job_type,
            jobLocation: { '@type': 'Place', address: { '@type': 'PostalAddress', addressLocality: career.location } },
            hiringOrganization: { '@type': 'Organization', name: 'Syntheseed' },
          }}
        />
      )}
      <Header />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 mb-10 pt-24">
        <div className="border-b pb-4 flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-primary mb-1">{career.title}</h1>
            <div className="flex flex-wrap items-center gap-3 text-secondary text-sm mt-1">
              <span className="flex items-center gap-1">
                <Briefcase size={16} /> <span>{career.department}</span>
              </span>
              <span className="flex items-center gap-1">
                <MapPin size={16} /> <span>{career.location}</span>
              </span>
              <span className="flex items-center gap-1">
                <Clock size={16} /> <span>{career.job_type} • {career.work_mode}</span>
              </span>
            </div>
          </div>
          <button
            onClick={() => {
              trackEvent('button_click', { button: 'Share', location: 'career_detail', career_id: id });
              navigator.share?.({
                title: career.title,
                text: stripToPlainText(career.description || ""),
                url: window.location.href,
              });
            }}
            className="btn-primary inline-flex items-center gap-2 px-3 py-2 mt-2"
            style={{ whiteSpace: "nowrap" }}
          >
            <Share2 size={16} /> Share
          </button>
        </div>
        <div className="mt-2">
          {career.description ? (
            <div className="prose prose-neutral prose-sm max-w-none ck-content"
              dangerouslySetInnerHTML={{ __html: toSafeRichText(career.description) }} />
          ) : (
            <p className="text-secondary">No description available.</p>
          )}
        </div>
        <div className="bg-bg-secondary rounded-2xl shadow-sm p-6 mt-4">
          <h2 className="text-xl font-semibold text-primary mb-2">
            Job Responsibilities & Requirements
          </h2>
          {career.details ? (
            <div className="prose prose-neutral prose-sm max-w-none ck-content"
              dangerouslySetInnerHTML={{ __html: toSafeRichText(career.details) }} />
          ) : (
            <p className="text-secondary">No additional details provided.</p>
          )}
        </div>
      </div>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <Link
          to="/careers/all"
          onClick={() => { trackEvent('button_click', { button: 'Back to All Careers', location: 'career_detail' }); window.scrollTo({ top: 0, behavior: "smooth" }); }}
          className="btn-primary"
        >
          ← Back to All Careers
        </Link>
      </div>
      <Footer />
    </>
  );
};

export default CareerDetail;
