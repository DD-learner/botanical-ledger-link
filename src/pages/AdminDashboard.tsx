import { motion } from 'framer-motion';
import { AdminPanel } from '@/components/AdminPanel';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Leaf, LogOut, Shield } from 'lucide-react';
import { AccountHover } from '@/components/ui/AccountHover';
import { useEffect, useState } from 'react';

declare global {
	interface Window { ethereum?: any }
}

export const AdminDashboard = () => {
	const { profile, signOut, user } = useAuth();
	const [walletConnected, setWalletConnected] = useState(false);
	const [currentAccount, setCurrentAccount] = useState<string | null>(null);

	// On each admin login, require explicit connect
	useEffect(() => {
		setWalletConnected(false);
		setCurrentAccount(null);
	}, [user?.id]);

	const connectWallet = async () => {
		const { ethereum } = window;
		if (!ethereum) {
			alert('MetaMask not found. Please install MetaMask.');
			return;
		}
		try {
			const accounts: string[] = await ethereum.request({ method: 'eth_requestAccounts' });
			if (accounts && accounts.length > 0) {
				setWalletConnected(true);
				setCurrentAccount(accounts[0]);
			}
		} catch (e) {
			console.error('Wallet connect failed:', e);
		}
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5">
			<div className="absolute inset-0 bg-grid-pattern opacity-5" />
			
			{/* Header */}
			<motion.header 
				initial={{ y: -20, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				className="relative z-10 border-b border-border/50 bg-card/80 backdrop-blur-sm"
			>
				<div className="container mx-auto px-4 py-4 flex items-center justify-between">
					<div className="flex items-center gap-3">
						<div className="w-10 h-10 bg-gradient-to-r from-primary to-secondary rounded-xl flex items-center justify-center">
							<Leaf className="w-5 h-5 text-white" />
						</div>
						<div>
							<h1 className="text-xl font-bold text-foreground">HerbTrace</h1>
							<p className="text-sm text-muted-foreground flex items-center gap-1">
								<Shield className="w-3 h-3" />
								Admin Portal
							</p>
						</div>
					</div>
					
					<div className="flex items-center gap-2 sm:gap-4">
						{(() => {
							const email = profile?.email || user?.email || null;
							const name = profile?.full_name || (user?.user_metadata as any)?.full_name || email || null;
							const role = profile?.role || (user?.user_metadata as any)?.role || null;
							return (
								<AccountHover
									name={name}
									email={email}
									role={role}
									userId={profile?.user_id || user?.id || null}
									createdAt={profile?.created_at || (user as any)?.created_at || null}
									updatedAt={profile?.updated_at || (user as any)?.updated_at || null}
									lastSignInAt={user?.last_sign_in_at ?? null}
								/>
							);
						})()}
						<Button
							variant="ghost"
							size="sm"
							onClick={signOut}
							className="flex items-center gap-2"
						>
							<LogOut className="w-4 h-4" />
							<span className="hidden sm:inline">Sign Out</span>
						</Button>
					</div>
				</div>
			</motion.header>

			<div className="container mx-auto px-4 py-8 relative z-10">
				{!walletConnected ? (
					<motion.div
						initial={{ y: 20, opacity: 0 }}
						animate={{ y: 0, opacity: 1 }}
						transition={{ delay: 0.1 }}
						className="border rounded-xl p-6 bg-card/80 backdrop-blur-sm text-center"
					>
						<div className="mb-3 text-foreground font-medium">Connect your MetaMask to access admin features</div>
						<div className="text-sm text-muted-foreground mb-6">This ensures only authorized admins perform on-chain actions.</div>
						<Button onClick={connectWallet} className="inline-flex items-center gap-2">
							Connect MetaMask
						</Button>
					</motion.div>
				) : (
					<motion.div
						initial={{ y: 20, opacity: 0 }}
						animate={{ y: 0, opacity: 1 }}
						transition={{ delay: 0.1 }}
					>
						<AdminPanel contract={null} />
					</motion.div>
				)}
			</div>
		</div>
	);
};