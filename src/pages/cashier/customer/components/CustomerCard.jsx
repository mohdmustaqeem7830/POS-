// CustomerCard.jsx
import { StarIcon } from 'lucide-react'
import { Badge } from '../../../../components/ui/badge'

const CustomerCard = ({customer, onSelectCustomer, selectedCustomer}) => {
  return (
    <div 
      key={customer.id} 
      className={`p-3 sm:p-4 cursor-pointer hover:bg-accent transition-colors active:bg-accent min-h-[60px] ${selectedCustomer?.id === customer.id ? 'bg-accent' : ''}`}
      onClick={() => onSelectCustomer(customer)}
    >
      <div className="flex justify-between items-start gap-2">
        <div className="min-w-0 flex-1">
          <h3 className="font-medium text-sm sm:text-base truncate">{customer.fullName || 'Unknown Customer'}</h3>
          <p className="text-xs sm:text-sm text-muted-foreground">{customer.phone || 'N/A'}</p>
          <p className="text-xs sm:text-sm text-muted-foreground truncate">{customer.email || 'N/A'}</p>
        </div>
        <Badge variant="outline" className="flex items-center gap-1 flex-shrink-0 text-xs">
          <StarIcon className="h-3 w-3" />
          {customer.loyaltyPoints || 0} pts
        </Badge>
      </div>
    </div>
  )
}

export default CustomerCard;