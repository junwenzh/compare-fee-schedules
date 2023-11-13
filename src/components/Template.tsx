import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const tabs = {
  qnxt: ['CPT', 'Modifiers', 'POS', 'Fee', 'Effective', 'Terminate'],
  facility: ['CPT', 'Modifiers', 'Office fee', 'Facility fee', 'Effective'],
  magnacare: [
    'CPT',
    'Modifier',
    'Effective',
    'Terminate',
    'Global fee',
    'Professional fee',
    'Technical fee',
  ],
};

export default function Template() {
  return (
    <Tabs defaultValue="qnxt" className="border p-4 rounded-md shadow-sm mt-4">
      <TabsList>
        <TabsTrigger value="qnxt">QNXT</TabsTrigger>
        <TabsTrigger value="facility">Office/Facility</TabsTrigger>
        <TabsTrigger value="magnacare">MagnaCare</TabsTrigger>
      </TabsList>
      <TabsContent value="qnxt" className="text-center">
        {tabs.qnxt.map(tab => (
          <div key={tab}>{tab}</div>
        ))}
      </TabsContent>
      <TabsContent value="facility" className="text-center">
        {tabs.facility.map(tab => (
          <div key={tab}>{tab}</div>
        ))}
      </TabsContent>
      <TabsContent value="magnacare" className="text-center">
        {tabs.magnacare.map(tab => (
          <div key={tab}>{tab}</div>
        ))}
      </TabsContent>
    </Tabs>
  );
}
