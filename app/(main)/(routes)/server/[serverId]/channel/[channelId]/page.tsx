"use client";

import ChatHeader from "@/components/chat/chat-header";
import useChannel from "@/hooks/fetching/channel/useChannel";
import React, { useMemo } from "react";

interface ChannelPageProps {
  params: {
    serverId: string;
    channelId: string;
  };
}

const ChannelPage: React.FC<ChannelPageProps> = ({ params }) => {
  const { data: channelData, isLoading: channelLoading } = useChannel(
    params.channelId,
    params.serverId
  );
  const body: React.ReactNode = useMemo(() => {
    if (!channelData || channelLoading || !channelData.success) {
      return <></>;
    } else {
      return (
        <ChatHeader
          name={channelData.data.name}
          serverId={params.serverId}
          type="channel"
          imageUrl=""
        />
      );
    }
  }, [channelData, channelLoading]);
  return <div>{body}</div>;
};

export default ChannelPage;
