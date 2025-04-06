export default function SizeGuidePage() {
  return (
    <div className="container px-4 py-8 md:py-12">
      <h1 className="text-4xl font-bold mb-4 text-indigo-900 dark:text-indigo-400">Size Guide</h1>
      <p className="text-gray-600 dark:text-gray-300 mb-8">
        Use our comprehensive size guide to find the perfect fit. For the most accurate measurements, use a tape measure
        and measure directly against the body.
      </p>

      <div className="grid gap-8 md:grid-cols-2">
        <div className="border rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-6 text-indigo-900 dark:text-indigo-400">How to Measure</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="font-bold text-indigo-900 dark:text-indigo-400 mb-2">Chest</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Measure around the fullest part of the chest, keeping the tape measure horizontal.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-indigo-900 dark:text-indigo-400 mb-2">Waist</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Measure around the natural waistline, keeping the tape measure snug but not tight.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-indigo-900 dark:text-indigo-400 mb-2">Hip</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Measure around the fullest part of the hips, approximately 20cm below the waistline.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-indigo-900 dark:text-indigo-400 mb-2">Inside Leg</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Measure from the crotch to the desired trouser length.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="border rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-6 text-indigo-900 dark:text-indigo-400">Size Charts</h2>

            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-indigo-900 dark:text-indigo-400 mb-2">Shirts & Blouses (cm)</h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2">Size</th>
                        <th className="text-left py-2">Chest</th>
                        <th className="text-left py-2">Waist</th>
                        <th className="text-left py-2">Hip</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="py-2">XS</td>
                        <td className="py-2">76-81</td>
                        <td className="py-2">61-66</td>
                        <td className="py-2">84-89</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2">S</td>
                        <td className="py-2">81-86</td>
                        <td className="py-2">66-71</td>
                        <td className="py-2">89-94</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2">M</td>
                        <td className="py-2">86-91</td>
                        <td className="py-2">71-76</td>
                        <td className="py-2">94-99</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2">L</td>
                        <td className="py-2">91-96</td>
                        <td className="py-2">76-81</td>
                        <td className="py-2">99-104</td>
                      </tr>
                      <tr>
                        <td className="py-2">XL</td>
                        <td className="py-2">96-101</td>
                        <td className="py-2">81-86</td>
                        <td className="py-2">104-109</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div>
                <h3 className="font-bold text-indigo-900 dark:text-indigo-400 mb-2">Trousers & Skirts (cm)</h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2">Size</th>
                        <th className="text-left py-2">Waist</th>
                        <th className="text-left py-2">Hip</th>
                        <th className="text-left py-2">Inside Leg</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="py-2">XS</td>
                        <td className="py-2">61-66</td>
                        <td className="py-2">84-89</td>
                        <td className="py-2">74</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2">S</td>
                        <td className="py-2">66-71</td>
                        <td className="py-2">89-94</td>
                        <td className="py-2">76</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2">M</td>
                        <td className="py-2">71-76</td>
                        <td className="py-2">94-99</td>
                        <td className="py-2">78</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2">L</td>
                        <td className="py-2">76-81</td>
                        <td className="py-2">99-104</td>
                        <td className="py-2">80</td>
                      </tr>
                      <tr>
                        <td className="py-2">XL</td>
                        <td className="py-2">81-86</td>
                        <td className="py-2">104-109</td>
                        <td className="py-2">82</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          <div className="border rounded-lg p-6 bg-indigo-50 dark:bg-indigo-950">
            <h3 className="font-bold text-indigo-900 dark:text-indigo-400 mb-2">Need a Custom Size?</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              We offer custom sizing for a perfect fit. When ordering, select the "Custom Size" option and provide your
              measurements.
            </p>
            <p className="text-sm text-gray-500">
              Note: Custom-sized items may take 7-10 business days to manufacture and cannot be returned unless faulty.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}