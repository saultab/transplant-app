import * as React from 'react';
import styled from 'styled-components';


export const Container = styled.View`
  flex: 1;
  padding-left: 20px;
  padding-right: 20px;
  align-items: center;
  background-color: #ffffff;
`;

export const Card = styled.TouchableOpacity`
  width: 100%;
`;

export const ProfileItem = styled.View`
  width: 100%;
`;


export const UserInfo = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const UserImgWrapper = styled.View`
  padding-top: 15px;
  padding-bottom: 15px;
`;


export const UserImg = styled.Image`
  width: 50px;
  height: 50px;
  border-radius: 25px;
`;

export const ChallengeImg = styled.Image`
  width: 100%;
  height: 120px;
  border-radius: 5px;
  
`;

export const ChallengeImg2 = styled.Image`
  width: 100%;
  height: 150px;
  border-radius: 5px;
  
`;

export const SingleChallengeImg = styled.Image`
  width: 90%;
  height: 220px;
  border-radius: 5px;
  
`;

export const UserChallengeWrapper = styled.View`
  padding-top: 0px;
  padding-bottom: 5px;
`;


export const TextSection = styled.View`
  flex-direction: column;
  justify-content: center;
  padding: 15px;
  padding-left: 0;
  margin-left: 10px;
  width: 300px;
  border-bottom-width: 1px;
  border-bottom-color: #cccccc;
`;

export const UserInfoText = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 5px;
`;

// font-family: 'Lato-Regular';
export const UserName = styled.Text`
  font-size: 14px;
  font-weight: bold;
`;
//  font-family: 'Lato-Regular';
export const PostTime = styled.Text`
  font-size: 12px;
  color: #666;
`;

export const MessageText = styled.Text`
  font-size: 14px;
  color: #333333;
`;