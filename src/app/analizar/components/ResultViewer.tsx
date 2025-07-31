// "use client";

// import {parseTransactions} from "@/app/lib/parseTransactions";
// import {Card, CardContent} from "@/components/ui/card";
// import {ScrollArea} from "@/components/ui/scroll-area";
// import {json} from "stream/consumers";

// export default function ResultViewer({data}: any) {
//   console.log("data", data);
//   //const transactions = parseTransactions(data);
//   const transactions = data;
//   if (!transactions.length) {
//     return (
//       <p className="text-center text-sm text-muted-foreground">
//         No se encontraron movimientos.
//       </p>
//     );
//   }

//   return (
//     <pre>{data}</pre>
//     // <ScrollArea className="max-h-[500px] w-full">
//     //   <div className="space-y-2">
//     //     {transactions.map((tx, idx) => (
//     //       <Card key={idx} className="rounded-2xl p-3 shadow-sm">
//     //         <CardContent className="p-0 flex flex-col gap-1">
//     //           <div className="text-sm text-muted-foreground">{tx.date}</div>
//     //           <div className="font-medium">{tx.description}</div>
//     //           <div className="text-right text-sm font-semibold">
//     //             {tx.currency} {tx.amount.toFixed(2)}
//     //           </div>
//     //         </CardContent>
//     //       </Card>
//     //     ))}
//     //   </div>
//     // </ScrollArea>
//   );
// }
