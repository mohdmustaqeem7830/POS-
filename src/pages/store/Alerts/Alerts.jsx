import React from 'react'
import { Card } from '../../../components/ui/card'
import InactiveCashierTable from './InactiveCashierTable'
import LowStockProductTable from './LowStockProductTable'
import NoSaleTodayBranchTable from './NoSaleTodayBranchTable'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { getStoreAlerts } from '../../../Redux Toolkit/features/storeAnalytics/storeAnalyticsThunks'
import { useEffect } from 'react'
import RefundSpikeTable from './RefundSpikeTable'

const Alerts = () => {
  const dispatch = useDispatch();
  const storeAnalytics = useSelector((state) => state.storeAnalytics);
  const user = useSelector((state) => state.user.userProfile);

  console.log("Store Alerts:", storeAnalytics.storeAlerts, user);

  useEffect(() => {
    dispatch(getStoreAlerts(user.id));
  }, []);

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 p-2 sm:p-4'>

      {/* Inactive Cashiers */}
      <div className='col-span-1 sm:col-span-1 xl:col-span-2'>
        <Card className="min-h-64 sm:min-h-96 px-3 sm:px-5 py-1 pt-4 sm:pt-5">
          <h1 className='font-bold text-lg sm:text-2xl mb-2'>Inactive Cashiers</h1>
          <InactiveCashierTable />
        </Card>
      </div>

      {/* Low Stock Alerts */}
      <div className='col-span-1 sm:col-span-1 xl:col-span-2'>
        <Card className="min-h-64 sm:min-h-96 px-3 sm:px-5 py-1 pt-4 sm:pt-5">
          <h1 className='font-bold text-lg sm:text-2xl mb-2'>Low Stock Alerts</h1>
          <LowStockProductTable />
        </Card>
      </div>

      {/* No Sale Today */}
      <div className='col-span-1 sm:col-span-1 xl:col-span-2'>
        <Card className="min-h-64 sm:min-h-96 px-3 sm:px-5 py-1 pt-4 sm:pt-5">
          <h1 className='font-bold text-lg sm:text-2xl mb-2'>No Sale Today</h1>
          <NoSaleTodayBranchTable />
        </Card>
      </div>

      {/* Refund Spike */}
      <div className='col-span-1 sm:col-span-1 xl:col-span-2'>
        <Card className="min-h-64 sm:min-h-96 px-3 sm:px-5 py-1 pt-4 sm:pt-5">
          <h1 className='font-bold text-lg sm:text-2xl mb-2'>Refund Spike</h1>
          <RefundSpikeTable />
        </Card>
      </div>

    </div>
  )
}

export default Alerts