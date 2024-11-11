import CryptoDetail from '@/components/crypto-detail'

export default function CryptoDetailPage({ params }: { params: { id: string } }) {
  return <CryptoDetail id={params.id} />
}