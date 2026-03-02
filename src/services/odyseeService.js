const ODYSEE_API_URL = 'https://api.na-backend.odysee.com/api/v1/proxy';

export const fetchChannelVideos = async (channelName = '@Alis_FX') => {
  try {
    // Step 1: Resolve the channel to get its ID
    const resolveResponse = await fetch(ODYSEE_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        jsonrpc: '2.0',
        method: 'resolve',
        params: { urls: [`lbry://${channelName}`] }
      })
    });

    const resolveData = await resolveResponse.json();
    const channelInfo = resolveData.result[Object.keys(resolveData.result)[0]];
    
    if (!channelInfo || channelInfo.error) {
      throw new Error('Channel not found');
    }

    const channelId = channelInfo.claim_id;

    // Step 2: Search for claims (videos) from this channel
    const searchResponse = await fetch(ODYSEE_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        jsonrpc: '2.0',
        method: 'claim_search',
        params: {
          channel_id: channelId,
          order_by: ['release_time'],
          page_size: 50,
          has_source: true,
          claim_type: 'stream'
        }
      })
    });

    const searchData = await searchResponse.json();
    const claims = searchData.result.items || [];

    // Step 3: Map claims to our Video format
    return claims.map(claim => {
      const { value, claim_id, name, permanent_url } = claim;
      const title = value.title || name;
      const thumbnail = value.thumbnail ? value.thumbnail.url : 'https://picsum.photos/seed/video/1280/720';
      const author = channelName.replace('@', '');
      const releaseTime = new Date(value.release_time * 1000);
      const postedAt = formatTimeAgo(releaseTime);
      const duration = formatDuration(value.video ? value.video.duration : 0);
      
      // Construct the embed URL
      // Format: https://odysee.com/$/embed/NAME/CLAIM_ID
      const videoUrl = `https://odysee.com/$/embed/${name}/${claim_id}`;

      return {
        id: claim_id,
        title,
        thumbnail,
        videoUrl,
        author,
        views: 'Odysee Video', // API doesn't provide views directly in claim_search easily
        postedAt,
        duration,
        description: value.description || ''
      };
    });
  } catch (error) {
    console.error('Error fetching Odysee videos:', error);
    return [];
  }
};

const formatTimeAgo = (date) => {
  const now = new Date();
  const diffInSeconds = Math.floor((now - date) / 1000);
  
  if (diffInSeconds < 60) return 'Just now';
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours}h ago`;
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 30) return `${diffInDays}d ago`;
  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) return `${diffInMonths}mo ago`;
  const diffInYears = Math.floor(diffInMonths / 12);
  return `${diffInYears}y ago`;
};

const formatDuration = (seconds) => {
  if (!seconds) return '00:00';
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  
  const parts = [];
  if (h > 0) parts.push(h.toString().padStart(2, '0'));
  parts.push(m.toString().padStart(2, '0'));
  parts.push(s.toString().padStart(2, '0'));
  
  return parts.join(':');
};
