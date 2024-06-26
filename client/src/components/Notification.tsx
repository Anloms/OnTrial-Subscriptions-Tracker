import { useState, useEffect } from "react";
import { BellIcon, DeleteIcon } from "@chakra-ui/icons";
import {
  Flex,
  Box,
  Button,
  List,
  ListItem,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  Text,
  useToast,
} from "@chakra-ui/react";
import apiService from "../services/apiService";
import { NOTIFICATION } from "../utils/definitions";
import { generateToastConfig } from "../utils/toastUtils";

const Notification = () => {
  const [notifications, setNotifications] = useState<NOTIFICATION[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const toast = useToast();

  useEffect(() => {
    const loadNotifications = async () => {
      try {
        const notifications = await apiService.fetchNotifications();
        if (Array.isArray(notifications)) setNotifications(notifications);
      } catch (error) {
        console.error("Error loading notifications:", error);
      }
    };

    loadNotifications();
  }, []);

  const renderMessage = (message: string) => {
    const subscriptionName = message;
    return (
      <Box>
        Your subscription for{" "}
        <Text as="span" fontWeight="bold" fontSize="lg">
          {subscriptionName}
        </Text>{" "}
        is due tomorrow.
      </Box>
    );
  };
  const handleChange = async (notification: NOTIFICATION) => {
    if (notification._id === undefined) {
      return toast(generateToastConfig("error", "error deleting notification"));
    } else {
      console.log(notification._id);
      const deleteNotif = await apiService.deleteNotification(notification._id);
      if (deleteNotif !== undefined) {
        setNotifications((prev) =>
          prev.filter((oldNotification) => {
            console.log("setting new notifs");
            return oldNotification._id !== notification._id;
          })
        );
      } else {
        toast(generateToastConfig("error", "no response from the database"));
      }
    }
  };

  return (
    <Popover
      isOpen={isOpen}
      onOpen={() => setIsOpen(true)}
      onClose={() => setIsOpen(false)}
      isLazy
    >
      <PopoverTrigger>
        <Button variant="ghost">
          <BellIcon w={6} h={6} data-testid="bellIcon" />
          {notifications.length > 0 && (
            <Box
              as="span"
              ml={1}
              fontSize="xl"
              color="red.500"
              data-testid="notifNumber"
            >
              {notifications.length}
            </Box>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverBody>
          {notifications.length === 0 ? (
            <Box>No new notifications</Box>
          ) : (
            <List>
              {notifications.map((notification) => (
                <ListItem
                  key={notification._id}
                  p={2}
                  borderBottom={"1px"}
                  borderColor={"black"}
                  _last={{ border: "none" }}
                >
                  <Flex direction={"row"} align="center" gap={5}>
                    {renderMessage(notification.message)}
                    <Button onClick={() => handleChange(notification)}>
                      <DeleteIcon w={4} h={4}></DeleteIcon>
                    </Button>
                  </Flex>
                </ListItem>
              ))}
            </List>
          )}
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default Notification;
