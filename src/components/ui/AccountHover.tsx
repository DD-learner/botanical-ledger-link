import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Check, Shield, User as UserIcon, Mail } from 'lucide-react';
import { Button } from './button';

interface AccountHoverProps {
	name?: string | null;
	email?: string | null;
	role?: 'admin' | 'customer' | string | null;
	userId?: string | null;
	createdAt?: string | null;
	updatedAt?: string | null;
	lastSignInAt?: string | null;
}

export function AccountHover({ name, email, role, userId, createdAt, updatedAt, lastSignInAt }: AccountHoverProps) {
	const [open, setOpen] = useState(false);
	const [pinned, setPinned] = useState(false);
	const [copied, setCopied] = useState(false);
	const popoverRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		const onDocClick = (e: MouseEvent) => {
			if (!pinned) return;
			if (popoverRef.current && !popoverRef.current.contains(e.target as Node)) {
				setPinned(false);
				setOpen(false);
			}
		};
		document.addEventListener('mousedown', onDocClick);
		return () => document.removeEventListener('mousedown', onDocClick);
	}, [pinned]);

	const displayRole = (role || 'customer') as string;

	const copyId = async () => {
		if (!userId) return;
		try {
			await navigator.clipboard.writeText(userId);
			setCopied(true);
			setTimeout(() => setCopied(false), 1200);
		} catch {}
	};

	return (
		<div className="relative">
			<button
				onMouseEnter={() => !pinned && setOpen(true)}
				onMouseLeave={() => !pinned && setOpen(false)}
				onFocus={() => !pinned && setOpen(true)}
				onBlur={() => !pinned && setOpen(false)}
				onClick={() => {
					setPinned((v) => !v);
					setOpen((v) => (pinned ? false : true));
				}}
				className="flex items-center gap-2 px-3 py-2 rounded-lg border bg-background hover:bg-accent/40 text-sm"
			>
				<UserIcon className="w-4 h-4 text-muted-foreground" />
				<span className="hidden sm:inline text-foreground max-w-[180px] truncate">
					{name || email || 'Account'}
				</span>
				{displayRole === 'admin' && (
					<span className="px-2 py-0.5 bg-primary/10 text-primary text-xs rounded-full font-medium">
						Admin
					</span>
				)}
			</button>

			<AnimatePresence>
				{open && (
					<motion.div
						initial={{ opacity: 0, y: -6 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -6 }}
						transition={{ duration: 0.15 }}
						className="absolute right-0 mt-2 w-80 rounded-xl border bg-popover shadow-lg p-4 z-[9999]"
						onMouseEnter={() => !pinned && setOpen(true)}
						onMouseLeave={() => !pinned && setOpen(false)}
						ref={popoverRef}
					>
						<div className="flex items-center gap-3">
							<div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
								<Shield className="w-5 h-5 text-primary" />
							</div>
							<div className="min-w-0">
								<div className="font-medium truncate text-foreground">{name || email || '—'}</div>
								<div className="text-xs text-muted-foreground flex items-center gap-1 truncate">
									<Mail className="w-3 h-3" /> {email || '—'}
								</div>
							</div>
						</div>

						<div className="mt-3 grid grid-cols-3 gap-2 text-xs">
							<div className="col-span-1 text-muted-foreground">Role</div>
							<div className="col-span-2">
								<span className="px-2 py-1 rounded-md border bg-background">
									{displayRole}
								</span>
							</div>

							<div className="col-span-1 text-muted-foreground">User ID</div>
							<div className="col-span-2 flex items-center gap-2">
								<span className="font-mono truncate" title={userId || ''}>{userId || '—'}</span>
								<Button size="sm" variant="ghost" className="h-7 px-2" onClick={copyId} disabled={!userId}>
									{copied ? <Check className="w-4 h-4 text-success" /> : <Copy className="w-4 h-4" />}
								</Button>
							</div>

							
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}


