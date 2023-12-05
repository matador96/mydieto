function OrderItemData({ order }) {
   const orderItems = order.orderItems.map((item) => item.catalog);

   return (
      <div>
         <div
            style={{
               display: 'flex',
               width: '100%',
               justifyContent: 'space-between',
               alignItems: 'start',
               fontSize: '16px'
            }}>
            <div>
               {orderItems.map((item, index) => (
                  <p
                     style={{ display: 'flex', flexDirection: 'column' }}
                     key={index}>
                     {item.name}
                  </p>
               ))}
            </div>
         </div>
      </div>
   );
}

export default OrderItemData;
