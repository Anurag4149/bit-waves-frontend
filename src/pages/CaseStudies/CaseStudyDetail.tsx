import { useParams } from 'react-router-dom';

export default function CaseStudyDetail() {
  const { id } = useParams();
  
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-heading font-bold text-gray-900 mb-4">
        Case Study: {id}
      </h1>
      <p className="text-lg text-gray-600">
        Case study detail page - Coming Soon
      </p>
    </div>
  );
}




