import AukatCalculator from '@/components/calculator/AukatCalculator';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto py-8">
        <AukatCalculator />
      </div>
    </div>
  );
}