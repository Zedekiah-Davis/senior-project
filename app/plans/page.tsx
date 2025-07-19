
import { Footer } from "../ui/footer";
import { Header } from "../ui/header";
import { PlanCard } from "../../components/PlanCard"; 
const membershipPlans = [ 
  {
    id: 'bronze',
    name: 'Bronze Plan',
    price: 29.99,
    borderColor: 'border-amber-500',
    titleColor: 'text-amber-500',
    buttonStyle: 'btn-outline btn-amber',
    features: [
      'Unlimited gym access',
      '1 free fitness class/month',
      'Locker room access'
    ],
    hoverEffect: ''
  },
  {
    id: 'silver',
    name: 'Silver Plan',
    price: 49.99,
    borderColor: 'border-gray-400',
    titleColor: 'text-gray-600',
    buttonStyle: 'btn-primary',
    features: [
      'All Bronze benefits',
      '2 free fitness classes/month',
      'Weekly buddy pass'
    ],
    hoverEffect: 'transform hover:scale-105 transition-transform'
  },
  {
    id: 'gold',
    name: 'Gold Plan',
    price: 79.99,
    borderColor: 'border-yellow-400',
    titleColor: 'text-yellow-500',
    buttonStyle: 'btn-warning',
    features: [
      'All Silver benefits',
      'Unlimited fitness classes',
      'Daily buddy pass',
      '1-on-1 workout planning session',
      'Priority equipment booking'
    ],
    hoverEffect: ''
  }
];

export default function Page() {
  return (
    <div>
      <Header />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Membership Options</h1>
        <p className="mb-8">Choose the plan that fits your fitness journey.</p>
        
        <div className="flex flex-col md:flex-row gap-6 justify-center">
          {membershipPlans.map((plan) => (
            <PlanCard key={plan.id} plan={plan} />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}