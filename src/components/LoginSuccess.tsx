import { useState, useEffect } from "react";
import { Facebook, CheckCircle, ArrowLeft, AlertCircle } from "lucide-react";

interface TokenData {
  token: string;
  pageId: string;
}

export default function LoginSuccess() {
  const [userInfo, setUserInfo] = useState<any>(null);
  const [tokenData, setTokenData] = useState<TokenData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Extract token and pageId from URL hash
    const extractTokenFromUrl = () => {
      try {
        const hash = window.location.hash;
        if (!hash) {
          setError("No authentication data found");
          setLoading(false);
          return;
        }

        // Parse hash parameters
        const params = new URLSearchParams(hash.substring(1)); // Remove # and parse
        const token = params.get("token");
        const pageId = params.get("pageId");

        if (!token) {
          setError("Token not found in callback URL");
          setLoading(false);
          return;
        }

        // Parse JWT token (for display purposes)
        const tokenPayload = JSON.parse(atob(token.split(".")[1]));

        setTokenData({
          token,
          pageId: pageId || "N/A",
        });

        // Simulate user data (in real app, you'd fetch user info using the token)
        const userData = {
          name: "John Doe",
          email: "john.doe@example.com",
          picture:
            "https://fastly.picsum.photos/id/413/200/300.jpg?hmac=bfSGClFpOROonzp5IIDI-aVAQMyyCC9lSOp184Tqu4M",
          pageId: pageId || "106217229088030",
          tokenExpiry: new Date(tokenPayload.exp * 1000).toLocaleString(),
        };
        setUserInfo(userData);
        setLoading(false);

        // Store token in localStorage for future API calls
        localStorage.setItem("facebook_token", token);
        localStorage.setItem("page_id", pageId || "");
      } catch (err) {
        setError("Failed to parse authentication data");
        setLoading(false);
      }
    };

    extractTokenFromUrl();
  }, []);

  const handleBackToLogin = () => {
    // Clear stored tokens
    localStorage.removeItem("facebook_token");
    localStorage.removeItem("page_id");
    window.location.href = "/";
  };

  const copyTokenToClipboard = () => {
    if (tokenData?.token) {
      navigator.clipboard.writeText(tokenData.token);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Processing authentication...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="flex flex-col items-center mb-6">
              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <AlertCircle className="w-10 h-10 text-red-600" />
              </div>
              <h1 className="text-xl font-bold text-center text-gray-900 mb-2">
                Authentication Error
              </h1>
            </div>
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-700">{error}</p>
            </div>
            <button
              onClick={handleBackToLogin}
              className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-3 rounded-lg transition duration-200 flex items-center justify-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Login
            </button>
          </div>
        </div>
      </div>
    );
  }

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
                <div className="flex justify-between items-center text-sm mt-2">
                  <span className="text-gray-600">Page ID:</span>
                  <span className="font-medium text-gray-900">
                    {userInfo.pageId}
                  </span>
                </div>
                <div className="flex justify-between items-center text-sm mt-2">
                  <span className="text-gray-600">Token Expires:</span>
                  <span className="font-medium text-gray-900">
                    {userInfo.tokenExpiry}
                  </span>
                </div>
              </div>
            </div>
          )}

          {tokenData && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <h4 className="text-sm font-semibold text-blue-900 mb-3">
                Authentication Token
              </h4>
              <div className="bg-white rounded p-3 mb-3">
                <p className="text-xs font-mono text-gray-700 break-all mb-2">
                  {tokenData.token.substring(0, 50)}...
                </p>
                <button
                  onClick={copyTokenToClipboard}
                  className="text-xs bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded transition duration-200"
                >
                  Copy Token
                </button>
              </div>
              <div className="text-xs text-blue-700">
                <p>
                  <strong>Page ID:</strong> {tokenData.pageId}
                </p>
                <p className="mt-1">
                  Token has been stored in localStorage for API calls.
                </p>
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
