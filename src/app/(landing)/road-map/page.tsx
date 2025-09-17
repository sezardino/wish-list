import { Typography } from "@/components/modules/base/typography";
import { Card, CardBody, CardHeader, Chip, cn } from "@nextui-org/react";
import { Check } from "lucide-react";
import { roadmapPage } from "./content";

const currentMVPVersion = 1;

const RoadMapPage = () => {
  return (
    <main>
      <section className="container py-20">
        <header className="text-center">
          <Typography
            level="h1"
            styling="h1"
            weight="bold"
            className="my-6 text-pretty"
          >
            {roadmapPage.title}
          </Typography>
          <Typography level="p" className="mb-8 text-muted-foreground">
            {roadmapPage.subtitle}
          </Typography>
        </header>

        <ul className="-my-6">
          {roadmapPage.mvps.map(mvp, index) => (<div className="relative pl-8 sm:pl-32 py-6 group">
            {/* Purple label */}
            <div className="font-caveat font-medium text-2xl text-indigo-500 mb-1 sm:mb-0">
              The origin
            </div>
            {/* Vertical line (::before) ~ Date ~ Title ~ Circle marker (::after) */}
            <div className="flex flex-col sm:flex-row items-start mb-1 group-last:before:hidden before:absolute before:left-2 sm:before:left-0 before:h-full before:px-px before:bg-slate-300 sm:before:ml-[6.5rem] before:self-start before:-translate-x-1/2 before:translate-y-3 after:absolute after:left-2 sm:after:left-0 after:w-2 after:h-2 after:bg-indigo-600 after:border-4 after:box-content after:border-slate-50 after:rounded-full sm:after:ml-[6.5rem] after:-translate-x-1/2 after:translate-y-1.5">
              <time className="sm:absolute left-0 translate-y-0.5 inline-flex items-center justify-center text-xs font-semibold uppercase w-20 h-6 mb-3 sm:mb-0 text-emerald-600 bg-emerald-100 rounded-full">
                May, 2020
              </time>
              <div className="text-xl font-bold text-slate-900">
                Acme was founded in Milan, Italy
              </div>
            </div>
            {/* Content */}
            <div className="text-slate-500">
              Pretium lectus quam id leo. Urna et pharetra pharetra massa massa.
              Adipiscing enim eu neque aliquam vestibulum morbi blandit cursus
              risus.
            </div>
          </div>)}
          {/* Item #1 */}
          <div className="relative pl-8 sm:pl-32 py-6 group">
            {/* Purple label */}
            <div className="font-caveat font-medium text-2xl text-indigo-500 mb-1 sm:mb-0">
              The origin
            </div>
            {/* Vertical line (::before) ~ Date ~ Title ~ Circle marker (::after) */}
            <div className="flex flex-col sm:flex-row items-start mb-1 group-last:before:hidden before:absolute before:left-2 sm:before:left-0 before:h-full before:px-px before:bg-slate-300 sm:before:ml-[6.5rem] before:self-start before:-translate-x-1/2 before:translate-y-3 after:absolute after:left-2 sm:after:left-0 after:w-2 after:h-2 after:bg-indigo-600 after:border-4 after:box-content after:border-slate-50 after:rounded-full sm:after:ml-[6.5rem] after:-translate-x-1/2 after:translate-y-1.5">
              <time className="sm:absolute left-0 translate-y-0.5 inline-flex items-center justify-center text-xs font-semibold uppercase w-20 h-6 mb-3 sm:mb-0 text-emerald-600 bg-emerald-100 rounded-full">
                May, 2020
              </time>
              <div className="text-xl font-bold text-slate-900">
                Acme was founded in Milan, Italy
              </div>
            </div>
            {/* Content */}
            <div className="text-slate-500">
              Pretium lectus quam id leo. Urna et pharetra pharetra massa massa.
              Adipiscing enim eu neque aliquam vestibulum morbi blandit cursus
              risus.
            </div>
          </div>
          {/* Item #2 */}
          <div className="relative pl-8 sm:pl-32 py-6 group">
            {/* Purple label */}
            <div className="font-caveat font-medium text-2xl text-indigo-500 mb-1 sm:mb-0">
              The milestone
            </div>
            {/* Vertical line (::before) ~ Date ~ Title ~ Circle marker (::after) */}
            <div className="flex flex-col sm:flex-row items-start mb-1 group-last:before:hidden before:absolute before:left-2 sm:before:left-0 before:h-full before:px-px before:bg-slate-300 sm:before:ml-[6.5rem] before:self-start before:-translate-x-1/2 before:translate-y-3 after:absolute after:left-2 sm:after:left-0 after:w-2 after:h-2 after:bg-indigo-600 after:border-4 after:box-content after:border-slate-50 after:rounded-full sm:after:ml-[6.5rem] after:-translate-x-1/2 after:translate-y-1.5">
              <time className="sm:absolute left-0 translate-y-0.5 inline-flex items-center justify-center text-xs font-semibold uppercase w-20 h-6 mb-3 sm:mb-0 text-emerald-600 bg-emerald-100 rounded-full">
                May, 2021
              </time>
              <div className="text-xl font-bold text-slate-900">
                Reached 5K customers
              </div>
            </div>
            {/* Content */}
            <div className="text-slate-500">
              Pretium lectus quam id leo. Urna et pharetra pharetra massa massa.
              Adipiscing enim eu neque aliquam vestibulum morbi blandit cursus
              risus.
            </div>
          </div>
          {/* Item #3 */}
          <div className="relative pl-8 sm:pl-32 py-6 group">
            {/* Purple label */}
            <div className="font-caveat font-medium text-2xl text-indigo-500 mb-1 sm:mb-0">
              The acquisitions
            </div>
            {/* Vertical line (::before) ~ Date ~ Title ~ Circle marker (::after) */}
            <div className="flex flex-col sm:flex-row items-start mb-1 group-last:before:hidden before:absolute before:left-2 sm:before:left-0 before:h-full before:px-px before:bg-slate-300 sm:before:ml-[6.5rem] before:self-start before:-translate-x-1/2 before:translate-y-3 after:absolute after:left-2 sm:after:left-0 after:w-2 after:h-2 after:bg-indigo-600 after:border-4 after:box-content after:border-slate-50 after:rounded-full sm:after:ml-[6.5rem] after:-translate-x-1/2 after:translate-y-1.5">
              <time className="sm:absolute left-0 translate-y-0.5 inline-flex items-center justify-center text-xs font-semibold uppercase w-20 h-6 mb-3 sm:mb-0 text-emerald-600 bg-emerald-100 rounded-full">
                May, 2022
              </time>
              <div className="text-xl font-bold text-slate-900">
                Acquired various companies, inluding Technology Inc.
              </div>
            </div>
            {/* Content */}
            <div className="text-slate-500">
              Pretium lectus quam id leo. Urna et pharetra pharetra massa massa.
              Adipiscing enim eu neque aliquam vestibulum morbi blandit cursus
              risus.
            </div>
          </div>
          {/* Item #4 */}
          <div className="relative pl-8 sm:pl-32 py-6 group">
            {/* Purple label */}
            <div className="font-caveat font-medium text-2xl text-indigo-500 mb-1 sm:mb-0">
              The IPO
            </div>
            {/* Vertical line (::before) ~ Date ~ Title ~ Circle marker (::after) */}
            <div className="flex flex-col sm:flex-row items-start mb-1 group-last:before:hidden before:absolute before:left-2 sm:before:left-0 before:h-full before:px-px before:bg-slate-300 sm:before:ml-[6.5rem] before:self-start before:-translate-x-1/2 before:translate-y-3 after:absolute after:left-2 sm:after:left-0 after:w-2 after:h-2 after:bg-indigo-600 after:border-4 after:box-content after:border-slate-50 after:rounded-full sm:after:ml-[6.5rem] after:-translate-x-1/2 after:translate-y-1.5">
              <time className="sm:absolute left-0 translate-y-0.5 inline-flex items-center justify-center text-xs font-semibold uppercase w-20 h-6 mb-3 sm:mb-0 text-emerald-600 bg-emerald-100 rounded-full">
                May, 2023
              </time>
              <div className="text-xl font-bold text-slate-900">
                Acme went public at the New York Stock Exchange
              </div>
            </div>
            {/* Content */}
            <div className="text-slate-500">
              Pretium lectus quam id leo. Urna et pharetra pharetra massa massa.
              Adipiscing enim eu neque aliquam vestibulum morbi blandit cursus
              risus.
            </div>
          </div>
        </ul>

        <ul className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 before:to-transparent">
          {roadmapPage.mvps.map((mvp, index) => (
            <li
              key={index}
              className={cn(
                "relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group",
                currentMVPVersion >= index && "is-active"
              )}
            >
              <div
                className={cn(
                  "flex items-center justify-center w-10 h-10 rounded-full border border-white bg-background group-[.is-active]:bg-emerald-500 text-slate-500 group-[.is-active]:text-emerald-50 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2"
                )}
              >
                {currentMVPVersion >= index && <Check />}
              </div>
              {/* Card */}
              <Card className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)]">
                <CardHeader className="flex-col">
                  <div>
                    <Chip size="md" color="secondary" className="inline">
                      MVP {index + 1}
                    </Chip>{" "}
                    <Typography
                      level="h3"
                      styling="large"
                      weight="bold"
                      className="inline"
                    >
                      {mvp.name}
                    </Typography>
                  </div>
                  <Typography styling="small">{mvp.description}</Typography>
                </CardHeader>
                <CardBody>
                  <ul className="list-inside list-disc">
                    {mvp.features.map((feature, featureIndex) => (
                      <Typography
                        key={featureIndex}
                        asChild
                        styling="small"
                        className="text-muted-foreground"
                      >
                        <li>{feature}</li>
                      </Typography>
                    ))}
                  </ul>
                </CardBody>
              </Card>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
};

export default RoadMapPage;
