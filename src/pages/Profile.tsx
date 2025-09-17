// src/pages/Profile.tsx
import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useNavigate } from 'react-router-dom';

interface ProfileData {
  email: string;
  full_name?: string;
}

const Profile: React.FC = () => {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      setIsLoading(true);
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser ();

      if (userError || !user) {
        toast({
          title: 'Bạn chưa đăng nhập',
          description: 'Vui lòng đăng nhập để xem trang hồ sơ.',
          variant: 'destructive',
        });
        navigate('/');
        return;
      }

      const { data, error } = await supabase
        .from('profiles')
        .select('full_name,email')
        .eq('id', user.id)
        .single();

      if (error) {
        toast({
          title: 'Lỗi tải thông tin',
          description: error.message,
          variant: 'destructive',
        });
      } else {
        setProfile(data);
        setName(data?.full_name || '');
      }
      setIsLoading(false);
    };

    fetchProfile();
  }, [toast, navigate]);

  const handleUpdate = async () => {
    if (!profile) return;
    setIsLoading(true);
    const {
      data: { user },
    } = await supabase.auth.getUser ();

    if (!user) {
      toast({
        title: 'Bạn chưa đăng nhập',
        variant: 'destructive',
      });
      setIsLoading(false);
      return;
    }

    const updates = {
      id: user.id,
      full_name: name,
      updated_at: new Date().toISOString(),
    };

    const { error } = await supabase.from('profiles').upsert(updates);

    if (error) {
      toast({
        title: 'Cập nhật thất bại',
        description: error.message,
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Cập nhật thành công',
      });
    }
    setIsLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  if (!profile) {
    return (
      <div className="flex justify-center items-center h-[70vh] text-muted-foreground">
        Đang tải thông tin hồ sơ...
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6 dark:text-gray-300">
      <h1 className="text-3xl font-semibold mb-6">Thông tin cá nhân</h1>
      <div className="space-y-4">
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" value={profile.email} disabled className="cursor-not-allowed" />
        </div>
        <div>
          <Label htmlFor="name">Họ và tên</Label>
          <Input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={isLoading}
            placeholder="Nhập họ và tên"
          />
        </div>
        <div className="flex gap-4 mt-6">
          <Button onClick={handleUpdate} disabled={isLoading}>
            {isLoading ? 'Đang cập nhật...' : 'Cập nhật'}
          </Button>
          <Button variant="outline" onClick={handleLogout} disabled={isLoading}>
            Đăng xuất
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Profile;