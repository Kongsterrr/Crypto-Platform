import ChannelPage from '@/components/channel'

export default function ChannelPages({ params }: { params: { id: string } }) {
  return <ChannelPage params={params} />
}