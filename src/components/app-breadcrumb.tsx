import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { useMatches } from "react-router-dom";

function AppBreadcrumbs() {
  const matches: any = useMatches();
  console.log("matches", matches);

  const crumbs = matches
    .filter((match) => Boolean(match.handle?.crumb))
    .map((match) => match.handle.crumb(match.data));
    console.log(" crumbs",  crumbs);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {crumbs.map((crumb, index) => (
          <BreadcrumbItem className="hidden md:block" key={index}>
            {index === crumbs.length - 1 ? (
              <BreadcrumbPage>{crumb.name}</BreadcrumbPage>
            ) : (
              <>
                <BreadcrumbLink href={crumb.link}>{crumb.name}</BreadcrumbLink>
                <BreadcrumbSeparator className="hidden md:block" />
              </>
            )}
          </BreadcrumbItem>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

export default AppBreadcrumbs;
