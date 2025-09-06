import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Field } from '@/components/ui/Field';
import { Card } from '@/components/Card';
import { Leaf, Mail, Lock, User, Shield } from 'lucide-react';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';

export const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [role, setRole] = useState<'customer' | 'admin'>('customer');
  const [loading, setLoading] = useState(false);
  const { signIn, signUp } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Please fill in all required fields');
      return;
    }

    setLoading(true);
    
    try {
      if (isLogin) {
        const { error } = await signIn(email, password);
        if (error) {
          toast.error(error.message);
        } else {
          toast.success('Successfully signed in!');
        }
      } else {
        const { error } = await signUp(email, password, fullName, role);
        if (error) {
          toast.error(error.message);
        } else {
          toast.success('Successfully signed up! Please check your email to confirm your account.');
        }
      }
    } catch (error) {
      toast.error('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-flex items-center gap-2 mb-4"
          >
            <div className="w-12 h-12 bg-gradient-to-r from-primary to-secondary rounded-xl flex items-center justify-center">
              <Leaf className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              HerbTrace
            </span>
          </motion.div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h1>
          <p className="text-muted-foreground">
            {isLogin 
              ? 'Sign in to access your herbal traceability dashboard' 
              : 'Join HerbTrace to start tracking herbal products'
            }
          </p>
        </div>

        <Card className="p-8 backdrop-blur-sm bg-card/90 border-0 shadow-xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <Field label="Email" required>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="pl-10"
              />
              <Mail className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground pointer-events-none" />
            </Field>

            <Field label="Password" required>
              <div className="relative">
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="pl-10"
                />
                <Lock className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground pointer-events-none" />
              </div>
            </Field>

            {!isLogin && (
              <>
                <Field label="Full Name">
                  <div className="relative">
                    <Input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Enter your full name"
                      className="pl-10"
                    />
                    <User className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground pointer-events-none" />
                  </div>
                </Field>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground flex items-center gap-2">
                    <Shield className="w-4 h-4" />
                    Account Type
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setRole('customer')}
                      className={`p-3 rounded-lg border-2 transition-all ${
                        role === 'customer'
                          ? 'border-primary bg-primary/10 text-primary'
                          : 'border-border bg-background text-muted-foreground hover:border-primary/50'
                      }`}
                    >
                      Customer
                    </motion.button>
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setRole('admin')}
                      className={`p-3 rounded-lg border-2 transition-all ${
                        role === 'admin'
                          ? 'border-primary bg-primary/10 text-primary'
                          : 'border-border bg-background text-muted-foreground hover:border-primary/50'
                      }`}
                    >
                      Admin
                    </motion.button>
                  </div>
                </div>
              </>
            )}

            <Button
              type="submit"
              className="w-full"
              disabled={loading}
            >
              {loading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                />
              ) : (
                isLogin ? 'Sign In' : 'Create Account'
              )}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-muted-foreground">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
            </p>
            <Button
              variant="link"
              onClick={() => setIsLogin(!isLogin)}
              className="mt-1 p-0 h-auto font-medium"
            >
              {isLogin ? 'Create Account' : 'Sign In'}
            </Button>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};