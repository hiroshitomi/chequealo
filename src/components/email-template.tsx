import type * as React from "react";
import {
  Body,
  Button,
  Column,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  pixelBasedPreset,
  Row,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";

interface WelcomeEmailProps {
  name: string;
}

export const WelcomeEmail = ({name}: WelcomeEmailProps) => {
  return (
    <Html>
      <Head />
      <Tailwind
        config={{
          presets: [pixelBasedPreset],
          theme: {
            extend: {
              colors: {
                brand: "#2250f4",
                offwhite: "#fafbfb",
              },
              spacing: {
                0: "0px",
                20: "20px",
                45: "45px",
              },
            },
          },
        }}
      >
        <Preview>Netlify Welcome</Preview>
        <Body className="bg-offwhite font-sans text-base">
          <Container className="bg-white p-45">
            <Heading className="my-0 text-center leading-8">
              Welcome {name}!
            </Heading>

            <Section>
              <Row>
                <Text className="text-base">
                  Congratulations! You are joining over 3 million developers
                  around the world who use Netlify to build and ship sites,
                  stores, and apps.
                </Text>

                <Text className="text-base">Here is how to get started:</Text>
              </Row>
            </Section>

            <Section className="text-center">
              <Button className="rounded-lg bg-brand px-[18px] py-3 text-white">
                Go to your dashboard
              </Button>
            </Section>
          </Container>

          <Container className="mt-20">
            <Section>
              <Row>
                <Column className="px-20 text-right">
                  <Link>Unsubscribe</Link>
                </Column>
                <Column className="text-left">
                  <Link>Manage Preferences</Link>
                </Column>
              </Row>
            </Section>
            <Text className="mb-45 text-center text-gray-400">
              Netlify, 44 Montgomery Street, Suite 300 San Francisco, CA
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default WelcomeEmail;
