import ComingSoon from '@/components/ComingSoon';

export default function AdminEvent() {
  return (
    <div className="min-h-[400px] flex items-center justify-center">
      <ComingSoon
        title="Event Admin"
        message="Fitur event admin sedang dalam pengembangan. Anda akan dapat mengelola agenda dan jadwal kegiatan OSIS."
      />
    </div>
  );
}
