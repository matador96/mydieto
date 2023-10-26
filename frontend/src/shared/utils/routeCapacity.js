export default function routeCapacity(leads) {
   let capacity = 0;
   leads.map((e) => (capacity = capacity + e.capacity));

   return capacity;
}
