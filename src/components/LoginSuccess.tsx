import { useState, useEffect } from "react";
import { Facebook, CheckCircle, ArrowLeft } from "lucide-react";

export default function LoginSuccess() {
  const [userInfo, setUserInfo] = useState<any>(null);

  useEffect(() => {
    // You can retrieve user info from localStorage, URL params, or API call
    // For now, we'll simulate user data
    const userData = {
      name: "John Doe",
      email: "john.doe@example.com",
      picture:
        "https://fastly.picsum.photos/id/413/200/300.jpg?hmac=bfSGClFpOROonzp5IIDI-aVAQMyyCC9lSOp184Tqu4M",
    };
    setUserInfo(userData);
  }, []);

  const handleBackToLogin = () => {
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="flex flex-col items-center mb-8">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <Facebook className="w-12 h-12 text-blue-600 fill-current mb-4" />

            <h1 className="text-2xl font-bold text-center text-gray-900 mb-2">
              Login Successful!
            </h1>
            <p className="text-center text-gray-600 mb-6">
              You have successfully logged in with Facebook
            </p>
          </div>

          {userInfo && (
            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <div className="flex items-center space-x-4 mb-4">
                <img
                  src={userInfo.picture}
                  alt="Profile"
                  className="w-16 h-16 rounded-full"
                />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {userInfo.name}
                  </h3>
                  <p className="text-sm text-gray-600">{userInfo.email}</p>
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">Login Method:</span>
                  <span className="font-medium text-gray-900">Facebook</span>
                </div>
                <div className="flex justify-between items-center text-sm mt-2">
                  <span className="text-gray-600">Status:</span>
                  <span className="font-medium text-green-600">Connected</span>
                </div>
              </div>
            </div>
          )}

          <div className="space-y-3">
            <button
              onClick={() => (window.location.href = "/dashboard")}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-200"
            >
              Continue to Dashboard
            </button>

            <button
              onClick={handleBackToLogin}
              className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-3 rounded-lg transition duration-200 flex items-center justify-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Login
            </button>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="text-center text-sm text-gray-500">
              <p>Thank you for connecting with Facebook!</p>
              <p className="mt-1">Your account is now ready to use.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
